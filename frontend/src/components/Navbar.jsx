import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <GraduationCap size={26} />
          </div>
          <div>
            <h1 className="brand-title">Sistem Data Siswa</h1>
            <p className="brand-subtitle">Aplikasi CRUD Berbasis Express.js & React.js</p>
          </div>
        </div>
        <div className="badge-tag badge-bnsp">
          <Award size={14} />
          <span>Sertifikasi BNSP 2026</span>
        </div>
      </div>
    </header>
  );
}
