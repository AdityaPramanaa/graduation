import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X, User, Shield, LogOut, ChevronLeft, ChevronRight, Play, Trophy, Users, Target } from 'lucide-react';
import type { User as AppUser } from '../App';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'register' | 'admin') => void;
  user: AppUser | null;
  onLogout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      id: 1,
      title: "E-SPORTS DAN PERTUMBUHAN INDUSTRI GAME",
      subtitle: "E-SPORT",
      description: "kompetisi game online secara profesional",
      points: [
        "Tumbuh seiring pesatnya teknologi digital & internet.",
        "Fenomena global, sangat populer di kalangan generasi muda."
      ],
      images: [
        "/uploads/cindy.jpg",
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    },
    {
      id: 2,
      title: "PERTUMBUHAN INDUSTRI & E-SPORTS",
      subtitle: "PERTUMBUHAN INDUSTRI & E-SPORTS",
      description: "",
      points: [
        "Pertumbuhan global sangat cepat, khususnya Asia Tenggara (CAGR 20,8%).",
        "Di Indonesia, jadi cabang olahraga resmi sejak PON 2020.",
        "Infrastruktur, komunitas, dan ekonomi digital ikut berkembang."
      ],
      images: [
        "/uploads/cindy.jpg",
        "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    },
    {
      id: 3,
      title: "PELUANG KARIR DI E-SPORTS",
      subtitle: "PELUANG KARIR DI E-SPORTS",
      description: "",
      points: [
        "Pro Player (pemain profesional).",
        "Streamer & Content Creator.",
        "Shoutcaster, Pelatih, Analis Strategi, Manajer Tim.",
        "Gaji: Rp3-4 juta/bulan untuk pemula, miliaran rupiah/tahun untuk pro player."
      ],
      images: [
        "/uploads/cindy.jpg",
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400"
      ]
    }
  ];

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Kompetisi Profesional",
      description: "Bergabung dengan turnamen E-Sport tingkat nasional dan internasional"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Komunitas Aktif",
      description: "Jaringan pemain dan penggemar E-Sport yang luas"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Pelatihan Berkualitas",
      description: "Program pelatihan intensif untuk meningkatkan skill gaming"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleAuthClick = () => {
    if (user) {
      if (user.role === 'admin') {
        onNavigate('admin');
      } else {
        onLogout();
      }
    } else {
      onNavigate('login');
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Geometric Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/30 to-transparent transform skew-x-12"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-r from-cyan-600/20 to-transparent transform -skew-y-12"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-white">ATHENA E-SPORT</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Home</a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">About</a>
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 transform rotate-45 flex items-center justify-center border-4 border-white/20 hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white transform -rotate-45" />
                </div>
              </div>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Portfolio</a>
              <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                  {user.role === 'admin' ? <Shield className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4 text-white" />}
                  <span className="text-white text-sm">{user.nama}</span>
                </div>
              )}
              
              <button
                onClick={handleAuthClick}
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
              >
                {user ? (
                  user.role === 'admin' ? (
                    <>
                      <Shield className="w-4 h-4" />
                      <span>Dashboard</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </>
                  )
                ) : (
                  <>
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </>
                )}
              </button>

              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-slideDown">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Home</a>
                <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">About</a>
                <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Portfolio</a>
                <a href="#" className="text-white hover:text-cyan-400 transition-colors duration-300">Contact</a>
                {user && (
                  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg w-fit">
                    {user.role === 'admin' ? <Shield className="w-4 h-4 text-cyan-400" /> : <User className="w-4 h-4 text-white" />}
                    <span className="text-white text-sm">{user.nama}</span>
                  </div>
                )}
                <button
                  onClick={handleAuthClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg w-fit"
                >
                  {user ? (
                    user.role === 'admin' ? (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Dashboard</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </>
                    )
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </>
                  )}
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Top Text */}
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-cyan-400 tracking-[0.3em] text-sm md:text-base font-light mb-4">
                  A T H E N A &nbsp;&nbsp;&nbsp; E - S P O R T
                </p>
              </div>

              {/* Main Title */}
              <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  {currentSlideData.title}
                </h1>
                {currentSlideData.subtitle && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                    {currentSlideData.subtitle}
                  </h2>
                )}
                {currentSlideData.description && (
                  <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">{currentSlideData.description}</p>
                )}
              </div>

              {/* Points */}
              <div className={`space-y-3 sm:space-y-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {currentSlideData.points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-base sm:text-lg leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className={`flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <button
                  onClick={() => !user && onNavigate('login')}
                  className="group relative bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 text-white px-6 sm:px-8 py-3 rounded-lg hover:from-blue-600/40 hover:to-cyan-600/40 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500"></div>
                  <span className="relative text-base sm:text-lg font-semibold tracking-wider flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>{user ? "Learn More" : "Join Now"}</span>
                  </span>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </button>

                {/* Navigation Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className={`flex items-center space-x-2 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-cyan-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Game Presentation Label */}
              <div className={`flex items-center space-x-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-cyan-400"></div>
                  <div className="w-1 h-6 bg-blue-400"></div>
                  <div className="w-1 h-4 bg-white"></div>
                </div>
                <h3 className="text-lg sm:text-xl text-white font-semibold">Game Presentation</h3>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {currentSlideData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <div className="aspect-[16/10] sm:aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`E-Sports ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>

          {/* Features Section */}
          <div className={`mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Progress Bar */}
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 flex items-center space-x-2">
        <div className="w-16 sm:w-24 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-white/60 text-xs sm:text-sm">{currentSlide + 1}/{slides.length}</span>
      </div>
    </div>
  );
};

export default LandingPage;