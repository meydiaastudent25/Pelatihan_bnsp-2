import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

const JURUSAN_OPTIONS = [
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer dan Jaringan',
  'Multimedia',
  'Desain Komunikasi Visual',
  'Sistem Informasi Jaringan dan Aplikasi',
  'Teknik Elektronika Industri',
  'Akuntansi dan Keuangan Lembaga',
  'Bisnis Daring dan Pemasaran'
];

export default function SiswaFormModal({ isOpen, mode, initialData, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    kode_siswa: '',
    nama_siswa: '',
    alamat_siswa: '',
    tgl_siswa: '',
    jurusan_siswa: JURUSAN_OPTIONS[0]
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        kode_siswa: initialData.kode_siswa || '',
        nama_siswa: initialData.nama_siswa || '',
        alamat_siswa: initialData.alamat_siswa || '',
        tgl_siswa: initialData.tgl_siswa || '',
        jurusan_siswa: initialData.jurusan_siswa || JURUSAN_OPTIONS[0]
      });
    } else {
      setFormData({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: JURUSAN_OPTIONS[0]
      });
    }
    setErrorMsg('');
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validasi field kosong
    if (
      !formData.kode_siswa.trim() ||
      !formData.nama_siswa.trim() ||
      !formData.alamat_siswa.trim() ||
      !formData.tgl_siswa.trim() ||
      !formData.jurusan_siswa.trim()
    ) {
      setErrorMsg('Semua field wajib diisi lengkap!');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Gagal menyimpan data siswa');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{mode === 'edit' ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</h3>
          <button className="btn-icon" onClick={onClose} style={{ color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errorMsg && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecdd3',
                  borderRadius: 6,
                  padding: '10px 14px',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#dc2626',
                  fontSize: '0.85rem'
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="kode_siswa">Kode Siswa *</label>
              <input
                id="kode_siswa"
                name="kode_siswa"
                type="text"
                className="form-input"
                placeholder="Contoh: SIS-006"
                value={formData.kode_siswa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nama_siswa">Nama Lengkap Siswa *</label>
              <input
                id="nama_siswa"
                name="nama_siswa"
                type="text"
                className="form-input"
                placeholder="Contoh: Muhammad Farhan"
                value={formData.nama_siswa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tgl_siswa">Tanggal Siswa / Lahir *</label>
              <input
                id="tgl_siswa"
                name="tgl_siswa"
                type="date"
                className="form-input"
                value={formData.tgl_siswa}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jurusan_siswa">Jurusan Siswa *</label>
              <select
                id="jurusan_siswa"
                name="jurusan_siswa"
                className="form-select"
                value={formData.jurusan_siswa}
                onChange={handleChange}
                required
              >
                {JURUSAN_OPTIONS.map((jurusan) => (
                  <option key={jurusan} value={jurusan}>
                    {jurusan}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="alamat_siswa">Alamat Siswa *</label>
              <textarea
                id="alamat_siswa"
                name="alamat_siswa"
                className="form-textarea"
                placeholder="Contoh: Jl. Merpati No. 10, RT 02/05, Jakarta Selatan"
                value={formData.alamat_siswa}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              <Save size={16} />
              <span>{submitting ? 'Menyimpan...' : mode === 'edit' ? 'Perbarui Data' : 'Simpan Data'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
