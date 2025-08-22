import React, { useState } from 'react';
import { Shield, Users, Trash2, Edit3, Search, LogOut, Gamepad2, UserPlus, Filter, Download } from 'lucide-react';
import type { User } from '../App';

interface AdminDashboardProps {
  users: User[];
  onUpdateUsers: (users: User[]) => void;
  onLogout: () => void;
  token: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ users, onUpdateUsers, onLogout, token }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProdi, setFilterProdi] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    nama: '',
    nim: '',
    angkatan: '',
    prodi: ''
  });

  const prodiOptions = [
    'Sistem Informasi',
    'Teknologi Informasi',
    'Bisnis Digital',
    'Sistem Komputer'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nim.includes(searchTerm) ||
                         user.angkatan.includes(searchTerm);
    const matchesProdi = filterProdi === '' || user.prodi === filterProdi;
    return matchesSearch && matchesProdi && user.role !== 'admin';
  });

  const stats = {
    total: users.filter(u => u.role !== 'admin').length,
    sistemInformasi: users.filter(u => u.prodi === 'Sistem Informasi' && u.role !== 'admin').length,
    teknologiInformasi: users.filter(u => u.prodi === 'Teknologi Informasi' && u.role !== 'admin').length,
    bisnisDigital: users.filter(u => u.prodi === 'Bisnis Digital' && u.role !== 'admin').length,
    sistemKomputer: users.filter(u => u.prodi === 'Sistem Komputer' && u.role !== 'admin').length,
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setEditForm({
      nama: user.nama,
      nim: user.nim,
      angkatan: user.angkatan,
      prodi: user.prodi
    });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updatedUsers = users.map(user =>
          user.id === editingUser.id ? { ...user, ...editForm } : user
        );
        onUpdateUsers(updatedUsers);
        setEditingUser(null);
      }
    } catch {}
  };

  const handleDelete = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedUsers = users.filter(user => user.id !== userId);
        onUpdateUsers(updatedUsers);
        setShowDeleteConfirm(null);
      }
    } catch {}
  };

  const exportData = () => {
    const userData = filteredUsers.map(user => ({
      'Nama': user.nama,
      'NIM': user.nim,
      'Angkatan': user.angkatan,
      'Program Studi': user.prodi
    }));

    const csvContent = [
      Object.keys(userData[0] || {}).join(','),
      ...userData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'athena-users.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/60 text-sm">Athena E-Sport Management</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 bg-red-600/20 border border-red-500/30 text-red-200 px-4 py-2 rounded-lg hover:bg-red-600/30 transition-all duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div>
              <p className="text-white/60 text-sm">Sistem Informasi</p>
              <p className="text-2xl font-bold text-white">{stats.sistemInformasi}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div>
              <p className="text-white/60 text-sm">Teknologi Informasi</p>
              <p className="text-2xl font-bold text-white">{stats.teknologiInformasi}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div>
              <p className="text-white/60 text-sm">Bisnis Digital</p>
              <p className="text-2xl font-bold text-white">{stats.bisnisDigital}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div>
              <p className="text-white/60 text-sm">Sistem Komputer</p>
              <p className="text-2xl font-bold text-white">{stats.sistemKomputer}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Cari nama, NIM, atau angkatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <select
                value={filterProdi}
                onChange={(e) => setFilterProdi(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none"
              >
                <option value="" className="bg-gray-800">Semua Program Studi</option>
                {prodiOptions.map(prodi => (
                  <option key={prodi} value={prodi} className="bg-gray-800">{prodi}</option>
                ))}
              </select>
            </div>

            <button
              onClick={exportData}
              className="flex items-center justify-center space-x-2 bg-green-600/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-lg hover:bg-green-600/30 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Daftar Pengguna ({filteredUsers.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">NIM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Angkatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Program Studi</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-white/60">
                      Tidak ada data pengguna
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-white">{user.nama}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white/80">{user.nim}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white/80">{user.angkatan}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-cyan-600/20 text-cyan-200">
                          {user.prodi}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-600/20 transition-all duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(user.id)}
                            className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-600/20 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Pengguna</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Nama</label>
                <input
                  type="text"
                  value={editForm.nama}
                  onChange={(e) => setEditForm({ ...editForm, nama: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">NIM</label>
                <input
                  type="text"
                  value={editForm.nim}
                  onChange={(e) => setEditForm({ ...editForm, nim: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Angkatan</label>
                <input
                  type="text"
                  value={editForm.angkatan}
                  onChange={(e) => setEditForm({ ...editForm, angkatan: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Program Studi</label>
                <select
                  value={editForm.prodi}
                  onChange={(e) => setEditForm({ ...editForm, prodi: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {prodiOptions.map(prodi => (
                    <option key={prodi} value={prodi} className="bg-gray-800">{prodi}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Konfirmasi Hapus</h3>
            <p className="text-white/70 mb-6">
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;