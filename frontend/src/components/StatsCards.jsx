import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';

export default function StatsCards({ totalSiswa, jurusans, latestSiswa }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <h4>Total Siswa Terdaftar</h4>
          <p>{totalSiswa} Siswa</p>
        </div>
        <div className="stat-icon-wrapper icon-blue">
          <Users size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h4>Total Bidang Keahlian</h4>
          <p>{jurusans.length} Jurusan</p>
        </div>
        <div className="stat-icon-wrapper icon-purple">
          <BookOpen size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <h4>Siswa Terakhir Ditambahkan</h4>
          <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>
            {latestSiswa ? latestSiswa.nama_siswa : '-'}
          </p>
        </div>
        <div className="stat-icon-wrapper icon-emerald">
          <Clock size={24} />
        </div>
      </div>
    </div>
  );
}
