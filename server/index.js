import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve('uploads')));

// Ensure uploads directory exists
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'ktm-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (/^image\//.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// MySQL Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize tables
async function initDb() {
  const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      nim VARCHAR(50) NOT NULL UNIQUE,
      angkatan VARCHAR(10) NOT NULL,
      prodi VARCHAR(100) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      ktm_path VARCHAR(255),
      role ENUM('admin','user') NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const conn = await pool.getConnection();
  try {
    await conn.query(createUsers);
    // Seed admin if not exists
    const [rows] = await conn.query('SELECT id FROM users WHERE nim = ?', ['ADM001']);
    if (rows.length === 0) {
      const passwordHash = await bcrypt.hash('password', 10);
      await conn.query(
        'INSERT INTO users (nama, nim, angkatan, prodi, password_hash, role) VALUES (?,?,?,?,?,?)',
        ['Admin', 'ADM001', '2020', 'Sistem Informasi', passwordHash, 'admin']
      );
    }
  } finally {
    conn.release();
  }
}

// Auth middleware
function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/register', upload.single('ktmFile'), async (req, res) => {
  try {
    const { nama, nim, angkatan, prodi, password } = req.body;
    if (!nama || !nim || !angkatan || !prodi || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'KTM wajib diupload' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const ktmPath = '/uploads/' + path.basename(req.file.path);

    const conn = await pool.getConnection();
    try {
      await conn.query(
        'INSERT INTO users (nama, nim, angkatan, prodi, password_hash, ktm_path, role) VALUES (?,?,?,?,?,?,?)',
        [nama, nim, angkatan, prodi, passwordHash, ktmPath, 'user']
      );
    } finally {
      conn.release();
    }

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'NIM sudah terdaftar' });
    }
    return res.status(500).json({ message: 'Terjadi kesalahan', error: String(err.message || err) });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { nim, password } = req.body;
    if (!nim || !password) return res.status(400).json({ message: 'NIM dan password wajib diisi' });

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT * FROM users WHERE nim = ?', [nim]);
      if (rows.length === 0) return res.status(401).json({ message: 'NIM atau password salah' });
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ message: 'NIM atau password salah' });

      const token = jwt.sign({ id: user.id, role: user.role, nim: user.nim }, JWT_SECRET, { expiresIn: '1d' });
      res.json({
        token,
        user: {
          id: String(user.id),
          nama: user.nama,
          nim: user.nim,
          angkatan: user.angkatan,
          prodi: user.prodi,
          role: user.role
        }
      });
    } finally {
      conn.release();
    }
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: String(err.message || err) });
  }
});

app.get('/api/users', authRequired, async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query('SELECT id, nama, nim, angkatan, prodi, role FROM users');
      res.json(rows.map(r => ({ ...r, id: String(r.id) })));
    } finally {
      conn.release();
    }
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: String(err.message || err) });
  }
});

app.put('/api/users/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, angkatan, prodi } = req.body;
    const conn = await pool.getConnection();
    try {
      await conn.query('UPDATE users SET nama=?, nim=?, angkatan=?, prodi=? WHERE id=?', [nama, nim, angkatan, prodi, id]);
      res.json({ message: 'Updated' });
    } finally {
      conn.release();
    }
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: String(err.message || err) });
  }
});

app.delete('/api/users/:id', authRequired, async (req, res) => {
  try {
    const { id } = req.params;
    const conn = await pool.getConnection();
    try {
      await conn.query('DELETE FROM users WHERE id=?', [id]);
      res.json({ message: 'Deleted' });
    } finally {
      conn.release();
    }
  } catch (err) {
    return res.status(500).json({ message: 'Terjadi kesalahan', error: String(err.message || err) });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to init DB', err);
  process.exit(1);
});


