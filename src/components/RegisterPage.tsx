import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Gamepad2, Lock, User as UserIcon, GraduationCap, Calendar, BookOpen, Upload, X } from 'lucide-react';
import type { User } from '../App';

interface RegisterPageProps {
  onRegistered: (user: User, token: string) => void;
  onSwitchToLogin: () => void;
  onBack: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegistered, onSwitchToLogin, onBack }) => {
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    angkatan: '',
    prodi: '',
    password: '',
    confirmPassword: '',
    ktmFile: null as File | null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ktmPreview, setKtmPreview] = useState<string | null>(null);

  const prodiOptions = [
    'Sistem Informasi',
    'Teknologi Informasi',
    'Bisnis Digital',
    'Sistem Komputer'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB');
        return;
      }

      setFormData({
        ...formData,
        ktmFile: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setKtmPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeFile = () => {
    setFormData({
      ...formData,
      ktmFile: null
    });
    setKtmPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!formData.nama || !formData.nim || !formData.angkatan || !formData.prodi || !formData.password || !formData.confirmPassword || !formData.ktmFile) {
      setError('Silakan isi semua field');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak sama');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    if (!/^\d+$/.test(formData.nim)) {
      setError('NIM harus berupa angka');
      setIsLoading(false);
      return;
    }

    if (!/^\d{4}$/.test(formData.angkatan)) {
      setError('Angkatan harus berupa 4 digit tahun');
      setIsLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append('nama', formData.nama);
      form.append('nim', formData.nim);
      form.append('angkatan', formData.angkatan);
      form.append('prodi', formData.prodi);
      form.append('password', formData.password);
      if (formData.ktmFile) {
        form.append('ktmFile', formData.ktmFile);
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: form
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Gagal mendaftar');
      }

      // Auto login after register
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim: formData.nim, password: formData.password })
      });
      if (!loginRes.ok) {
        const data = await loginRes.json().catch(() => ({}));
        throw new Error(data.message || 'Gagal login setelah registrasi');
      }
      const loginData = await loginRes.json();
      onRegistered(loginData.user as User, loginData.token as string);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Athena</h1>
          <p className="text-white/60">Bergabunglah dengan komunitas E-Sport terbaik</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-200 text-sm animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nama" className="block text-white/80 text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Masukkan nama lengkap"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="nim" className="block text-white/80 text-sm font-medium mb-2">
                NIM
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="nim"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Contoh: 2023001"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="angkatan" className="block text-white/80 text-sm font-medium mb-2">
                Angkatan
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="angkatan"
                  name="angkatan"
                  value={formData.angkatan}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Contoh: 2023"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="prodi" className="block text-white/80 text-sm font-medium mb-2">
                Program Studi
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <select
                  id="prodi"
                  name="prodi"
                  value={formData.prodi}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 appearance-none"
                  disabled={isLoading}
                >
                  <option value="" className="bg-gray-800 text-white">Pilih Program Studi</option>
                  {prodiOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800 text-white">
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="ktm" className="block text-white/80 text-sm font-medium mb-2">
                Upload KTM (Kartu Tanda Mahasiswa)
              </label>
              <div className="relative">
                {!ktmPreview ? (
                  <div className="w-full bg-white/10 border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-all duration-300">
                    <input
                      type="file"
                      id="ktm"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isLoading}
                    />
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">Klik untuk upload KTM</p>
                    <p className="text-white/40 text-sm">Format: JPG, PNG, GIF (Max: 5MB)</p>
                  </div>
                ) : (
                  <div className="relative bg-white/10 border border-white/20 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={ktmPreview}
                        alt="KTM Preview"
                        className="w-24 h-24 object-cover rounded-lg border border-white/20"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{formData.ktmFile?.name}</p>
                        <p className="text-white/60 text-sm">
                          {formData.ktmFile && (formData.ktmFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 p-1 rounded-lg hover:bg-red-600/20 transition-all duration-200"
                        disabled={isLoading}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Minimal 6 karakter"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-white/80 text-sm font-medium mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                  placeholder="Ulangi password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Mendaftar...</span>
                </div>
              ) : (
                'Daftar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Sudah punya akun?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
              >
                Masuk disini
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">
            © 2024 Athena E-Sport. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;