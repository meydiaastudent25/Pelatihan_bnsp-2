import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SiswaTable from './components/SiswaTable';
import SiswaFormModal from './components/SiswaFormModal';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';
import { siswaService } from './services/siswaService';
import { Plus, Search, RefreshCw } from 'lucide-react';

export default function App() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurusan, setSelectedJurusan] = useState('');

  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [siswaToDelete, setSiswaToDelete] = useState(null);

  // Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Muat data siswa dari backend
  const fetchSiswa = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await siswaService.getAll(searchQuery, selectedJurusan);
      setSiswaList(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Gagal terhubung dengan server backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, [searchQuery, selectedJurusan]);

  // Handle Form Modal (Buka Tambah)
  const handleOpenAdd = () => {
    setFormMode('create');
    setSelectedSiswa(null);
    setIsFormModalOpen(true);
  };

  // Handle Form Modal (Buka Edit)
  const handleOpenEdit = (siswa) => {
    setFormMode('edit');
    setSelectedSiswa(siswa);
    setIsFormModalOpen(true);
  };

  // Submit Form (Tambah atau Update)
  const handleFormSubmit = async (formData) => {
    if (formMode === 'create') {
      const result = await siswaService.create(formData);
      showToast(result.message || 'Data siswa berhasil ditambahkan!', 'success');
    } else {
      const result = await siswaService.update(selectedSiswa.id, formData);
      showToast(result.message || 'Data siswa berhasil diperbarui!', 'success');
    }
    fetchSiswa();
  };

  // Buka Modal Hapus
  const handleOpenDelete = (siswa) => {
    setSiswaToDelete(siswa);
    setIsDeleteModalOpen(true);
  };

  // Konfirmasi Hapus Data
  const handleDeleteConfirm = async (id) => {
    try {
      const result = await siswaService.delete(id);
      showToast(result.message || 'Data siswa berhasil dihapus!', 'success');
      fetchSiswa();
    } catch (err) {
      showToast(err.message || 'Gagal menghapus data siswa', 'error');
    }
  };

  // Kumpulan jurusan unik untuk opsi filter dropdown
  const uniqueJurusans = useMemo(() => {
    const set = new Set();
    siswaList.forEach((s) => {
      if (s.jurusan_siswa) set.add(s.jurusan_siswa);
    });
    return Array.from(set);
  }, [siswaList]);

  return (
    <div>
      <Navbar />

      <main className="app-container">
        {/* Ringkasan Statistik */}
        <StatsCards
          totalSiswa={siswaList.length}
          jurusans={uniqueJurusans}
          latestSiswa={siswaList[0]}
        />

        {/* Toolbar Pencarian & Filter & Tombol Tambah */}
        <div className="toolbar-card">
          <div className="search-filters">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Cari nama, kode siswa, alamat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="select-filter"
              value={selectedJurusan}
              onChange={(e) => setSelectedJurusan(e.target.value)}
            >
              <option value="">Semua Jurusan</option>
              {uniqueJurusans.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>

            <button
              className="btn btn-secondary"
              onClick={fetchSiswa}
              title="Refresh Data"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={18} />
            <span>Tambah Siswa</span>
          </button>
        </div>

        {/* Tabel Data Siswa */}
        <SiswaTable
          siswaList={siswaList}
          loading={loading}
          error={error}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </main>

      {/* Modal Form Tambah / Edit */}
      <SiswaFormModal
        isOpen={isFormModalOpen}
        mode={formMode}
        initialData={selectedSiswa}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Modal Konfirmasi Hapus */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        siswa={siswaToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
