import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X, User, Shield } from 'lucide-react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';

export interface User {
  id: string;
  nama: string;
  nim: string;
  angkatan: string;
  prodi: string;
  role: 'admin' | 'user';
}

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register' | 'admin'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load session user & token
    const savedUser = localStorage.getItem('athena-current-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedToken = localStorage.getItem('athena-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token || !user || user.role !== 'admin') return;
      try {
        const res = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch {}
    };
    fetchUsers();
  }, [token, user]);

  const handleLogin = async (nim: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nim, password })
      });
      if (!res.ok) return false;
      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('athena-current-user', JSON.stringify(data.user));
      localStorage.setItem('athena-token', data.token);
      if (data.user.role === 'admin') setCurrentPage('admin');
      else setCurrentPage('landing');
      return true;
    } catch {
      return false;
    }
  };

  const handleRegistered = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem('athena-current-user', JSON.stringify(newUser));
    localStorage.setItem('athena-token', newToken);
    setCurrentPage(newUser.role === 'admin' ? 'admin' : 'landing');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('athena-current-user');
    localStorage.removeItem('athena-token');
    setCurrentPage('landing');
  };

  const updateUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentPage('register')} onBack={() => setCurrentPage('landing')} />;
      case 'register':
        return <RegisterPage onRegistered={handleRegistered} onSwitchToLogin={() => setCurrentPage('login')} onBack={() => setCurrentPage('landing')} />;
      case 'admin':
        return user?.role === 'admin' ? <AdminDashboard users={users} onUpdateUsers={updateUsers} onLogout={handleLogout} token={token || ''} /> : <LandingPage onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />;
      default:
        return <LandingPage onNavigate={setCurrentPage} user={user} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {renderPage()}
    </div>
  );
}

export default App;