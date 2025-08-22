# Athena E-Sport Website

Website responsif dan modern untuk komunitas E-Sport Athena dengan fitur autentikasi, dashboard admin, dan animasi yang menarik.

## 🚀 Fitur

- **Landing Page Responsif** - Desain modern dengan animasi smooth
- **Sistem Autentikasi** - Login dan register dengan validasi
- **Dashboard Admin** - Manajemen user dengan fitur CRUD
- **UI/UX Modern** - Menggunakan Tailwind CSS dan animasi CSS
- **Mobile First** - Responsif di semua perangkat
- **Foto Cindy** - Menggunakan foto dari server lokal

## 🛠️ Teknologi

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Node.js + Express (server folder)
- **Database**: SQLite
- **Deployment**: GitHub Pages

## 📦 Instalasi

1. Clone repository
```bash
git clone https://github.com/AdityaPramanaa/graduation.git
cd graduation
```

2. Install dependencies
```bash
npm install
```

3. Install server dependencies
```bash
cd server
npm install
cd ..
```

4. Setup environment
```bash
cp server/env.example server/.env
```

5. Jalankan development server
```bash
# Frontend only
npm run dev

# Backend only
npm run dev:server

# Both frontend and backend
npm run dev:all
```

## 🚀 Deployment

### GitHub Pages (Otomatis)

Website akan otomatis di-deploy ke GitHub Pages setiap kali ada push ke branch `master`.

### Manual Deployment

1. Build project
```bash
npm run build
```

2. Deploy ke GitHub Pages
```bash
npm run deploy
```

## 📱 Demo

Website live: [https://adityapramanaa.github.io/graduation/](https://adityapramanaa.github.io/graduation/)

## 🎨 Screenshots

### Landing Page
- Desain modern dengan gradient background
- Animasi smooth dan responsif
- Fitur slider otomatis
- Navigation mobile-friendly

### Login/Register
- Form validasi real-time
- Animasi loading dan feedback
- Design glassmorphism

### Admin Dashboard
- Tabel user dengan fitur search dan filter
- CRUD operations
- Export data ke CSV
- Statistics cards

## 🔧 Konfigurasi

### Environment Variables (Server)

Buat file `.env` di folder `server`:

```env
PORT=4000
JWT_SECRET=your_jwt_secret_here
DB_PATH=./sql/database.sqlite
```

### Build Configuration

File `vite.config.ts` sudah dikonfigurasi untuk GitHub Pages dengan base path `/graduation/`.

## 📁 Struktur Proyek

```
graduation/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── AdminDashboard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── index.js
│   ├── sql/
│   └── uploads/
├── public/
└── dist/
```

## 🎯 Fitur Utama

### Landing Page
- ✅ Responsive design
- ✅ Auto-sliding content
- ✅ Animated background
- ✅ Mobile navigation
- ✅ Feature cards

### Authentication
- ✅ User registration
- ✅ User login
- ✅ JWT token
- ✅ Form validation
- ✅ Error handling

### Admin Dashboard
- ✅ User management
- ✅ Search and filter
- ✅ Edit user data
- ✅ Delete users
- ✅ Export to CSV
- ✅ Statistics overview

## 🔒 Keamanan

- JWT authentication
- Password hashing
- Input validation
- CORS protection
- File upload validation

## 📈 Performance

- Lazy loading
- Code splitting
- Optimized images
- Minified assets
- CDN ready

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 👨‍💻 Author

**Aditya Pramana**
- GitHub: [@AdityaPramanaa](https://github.com/AdityaPramanaa)
- Website: [https://adityapramanaa.github.io/graduation/](https://adityapramanaa.github.io/graduation/)

---

⭐ Jika proyek ini membantu Anda, jangan lupa untuk memberikan star!
