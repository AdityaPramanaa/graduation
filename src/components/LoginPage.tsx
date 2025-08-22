import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, EyeOff, Gamepad2, Lock, User, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (nim: string, password: string) => Promise<boolean> | boolean;
  onSwitchToRegister: () => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegister, onBack }) => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!nim || !password) {
      setError('Silakan isi semua field');
      setIsLoading(false);
      return;
    }

    const success = await onLogin(nim, password);
    if (!success) {
      setError('NIM atau password salah');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4 sm:px-6 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 sm:top-8 left-4 sm:left-8 flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-300 z-10 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <div className={`relative z-10 w-full max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform duration-300 animate-glow">
                <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-fadeInUp">Welcome Back</h1>
          <p className="text-white/60 text-sm sm:text-base animate-fadeInUp" style={{animationDelay: '0.2s'}}>Masuk ke akun Athena E-Sport Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl animate-scaleIn">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 text-red-200 text-sm animate-bounceIn">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <label htmlFor="nim" className="block text-white/80 text-sm font-medium mb-2">
                NIM
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-cyan-400 transition-colors duration-300" />
                <input
                  type="text"
                  id="nim"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Masukkan NIM Anda"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <p className="text-white/40 text-xs mt-1">Gunakan "ADM001" untuk admin demo</p>
            </div>

            <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <label htmlFor="password" className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-cyan-400 transition-colors duration-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                  placeholder="Masukkan password"
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
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <p className="text-white/40 text-xs mt-1">Gunakan "password" untuk demo</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none animate-fadeInUp relative overflow-hidden group"
              style={{animationDelay: '0.5s'}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Masuk...</span>
                </div>
              ) : (
                <span className="relative z-10">Masuk</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            <p className="text-white/60 text-sm">
              Belum punya akun?{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <p className="text-white/40 text-xs">
            © 2024 Athena E-Sport. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;