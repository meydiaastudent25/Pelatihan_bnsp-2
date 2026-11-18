import React from 'react';
import { Edit2, Trash2, UserX, AlertCircle } from 'lucide-react';

export default function SiswaTable({ siswaList, loading, error, onEdit, onDelete }) {
  // Format tanggal ke format lokal Indonesia (contoh: 15 Maret 2006)
  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Helper kelas warna badge jurusan
  const getJurusanBadgeClass = (jurusan) => {
    const lower = (jurusan || '').toLowerCase();
    if (lower.includes('rekayasa') || lower.includes('rpl')) return 'jurusan-badge jurusan-rpl';
    if (lower.includes('komputer') || lower.includes('tkj') || lower.includes('jaringan')) return 'jurusan-badge jurusan-tkj';
    if (lower.includes('multimedia') || lower.includes('mm')) return 'jurusan-badge jurusan-mm';
    if (lower.includes('desain') || lower.includes('dkv')) return 'jurusan-badge jurusan-dkv';
    return 'jurusan-badge';
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="state-box">
          <div className="spinner"></div>
          <p>Sedang memuat data siswa dari backend...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="state-box" style={{ color: '#dc2626' }}>
          <AlertCircle size={40} style={{ color: '#dc2626' }} />
          <h4>Gagal Terhubung ke Backend</h4>
          <p style={{ marginTop: 6, fontSize: '0.875rem' }}>{error}</p>
          <p style={{ marginTop: 10, fontSize: '0.8rem', color: '#64748b' }}>
            Pastikan server Express.js berjalan di port 5000 (`npm start` pada folder backend).
          </p>
        </div>
      </div>
    );
  }

  if (siswaList.length === 0) {
    return (
      <div className="table-container">
        <div className="state-box">
          <UserX size={44} />
          <h4>Tidak Ada Data Siswa</h4>
          <p style={{ marginTop: 6, fontSize: '0.875rem' }}>
            Belum ada siswa yang tersimpan atau hasil pencarian tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px', textAlign: 'center' }}>No</th>
              <th>Kode Siswa</th>
              <th>Nama Siswa</th>
              <th>Tanggal Siswa</th>
              <th>Alamat Siswa</th>
              <th>Jurusan Siswa</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswaList.map((siswa, index) => (
              <tr key={siswa.id || index}>
                <td style={{ textAlign: 'center', fontWeight: 600, color: '#64748b' }}>
                  {index + 1}
                </td>
                <td>
                  <span className="kode-badge">{siswa.kode_siswa}</span>
                </td>
                <td>
                  <strong style={{ color: '#1e293b' }}>{siswa.nama_siswa}</strong>
                </td>
                <td>{formatTanggal(siswa.tgl_siswa)}</td>
                <td style={{ maxWidth: '240px', wordBreak: 'break-word' }}>
                  {siswa.alamat_siswa}
                </td>
                <td>
                  <span className={getJurusanBadgeClass(siswa.jurusan_siswa)}>
                    {siswa.jurusan_siswa}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div className="action-buttons" style={{ justifyContent: 'center' }}>
                    <button
                      className="btn-icon btn-icon-edit"
                      onClick={() => onEdit(siswa)}
                      title="Edit Data Siswa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="btn-icon btn-icon-delete"
                      onClick={() => onDelete(siswa)}
                      title="Hapus Data Siswa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
