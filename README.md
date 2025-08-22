# Athena E-Sport (Frontend + Backend)

Proyek ini berisi frontend Vite + React + Tailwind dan backend Express + MySQL untuk autentikasi (registrasi, login) dan manajemen pengguna.

## Prasyarat
- Node.js 18+
- MySQL Server

## Setup Database MySQL
1. Buat database dan tabel:
   - Jalankan file SQL berikut di MySQL Anda:
     - `server/sql/init.sql`
2. Atau buat manual:
   - Database: `aos_db`
   - Tabel: `users` (lihat skema di file SQL di atas)

## Konfigurasi Environment
1. Salin file contoh env:
   - Salin `server/.env.example` menjadi `server/.env`
2. Ubah nilai sesuai lingkungan Anda:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`

## Instalasi
```bash
# install dependency frontend
npm install

# install dependency backend
npm --prefix server install
```

## Menjalankan
- Jalankan backend dan frontend bersamaan:
```bash
npm run dev:all
```
- Atau jalankan terpisah:
```bash
# backend (http://localhost:4000)
npm run dev:server
# frontend (http://localhost:5173)
npm run dev
```

Frontend sudah diatur proxy ke backend (`vite.config.ts`) untuk path `/api`.

## Endpoint API (ringkas)
- POST `/api/auth/register` (multipart/form-data): `nama, nim, angkatan, prodi, password, ktmFile`
- POST `/api/auth/login` (json): `nim, password` → balikan `{ token, user }`
- GET `/api/users` (Bearer token)
- PUT `/api/users/:id` (Bearer token)
- DELETE `/api/users/:id` (Bearer token)

## Akun Admin Demo
- NIM: `ADM001`
- Password: `password`

## Catatan Responsivitas
- Beberapa penyesuaian kelas Tailwind ditambahkan agar tampilan lebih nyaman di layar kecil (padding, grid gap, heading size, aspect ratio gambar).
