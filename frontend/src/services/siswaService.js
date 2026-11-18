// Gunakan Base URL dari environment variable atau fallback ke relative /api
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const siswaService = {
  // Ambil semua data siswa (opsional pencarian & filter jurusan)
  async getAll(search = '', jurusan = '') {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (jurusan) params.append('jurusan', jurusan);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${BASE_URL}/siswa${queryString}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal memuat data siswa');
    }
    return result.data || [];
  },

  // Ambil detail satu siswa berdasarkan ID
  async getById(id) {
    const res = await fetch(`${BASE_URL}/siswa/${id}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal memuat detail siswa');
    }
    return result.data;
  },

  // Tambah siswa baru (POST)
  async create(payload) {
    const res = await fetch(`${BASE_URL}/siswa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menambahkan data siswa');
    }
    return result;
  },

  // Update data siswa (PUT)
  async update(id, payload) {
    const res = await fetch(`${BASE_URL}/siswa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal memperbarui data siswa');
    }
    return result;
  },

  // Hapus data siswa (DELETE)
  async delete(id) {
    const res = await fetch(`${BASE_URL}/siswa/${id}`, {
      method: 'DELETE'
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Gagal menghapus data siswa');
    }
    return result;
  }
};
