import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, siswa, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !siswa) return null;

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm(siswa.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#dc2626' }}>
            <AlertTriangle size={20} />
            <span>Konfirmasi Hapus Data</span>
          </h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', padding: '24px 20px' }}>
          <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: 1.5 }}>
            Apakah Anda yakin ingin menghapus data siswa:
          </p>
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: '12px 16px',
              margin: '16px 0',
              textAlign: 'left'
            }}
          >
            <p><strong>Kode:</strong> {siswa.kode_siswa}</p>
            <p><strong>Nama:</strong> {siswa.nama_siswa}</p>
            <p><strong>Jurusan:</strong> {siswa.jurusan_siswa}</p>
          </div>
          <p style={{ color: '#dc2626', fontSize: '0.825rem' }}>
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={deleting}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            <Trash2 size={16} />
            <span>{deleting ? 'Menghapus...' : 'Ya, Hapus Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
