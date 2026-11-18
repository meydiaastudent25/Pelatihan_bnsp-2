# Frontend CRUD Data Siswa (React.js + Vite)

Aplikasi Antarmuka Pengguna (Frontend) untuk mengelola data siswa yang terhubung langsung (mengkonsumsi) RESTful API dari backend Express.js. Dibangun menggunakan **React.js 19**, **Vite**, dan ikon modern dari **Lucide React**.

## Fitur Aplikasi
- **Menampilkan Data (Read)**: Menampilkan tabel daftar siswa dengan nomor urut, kode siswa, nama, tanggal lahir (format Indonesia), alamat, badge jurusan, dan tombol aksi.
- **Pencarian & Filter**: Mencari berdasarkan nama siswa, kode siswa, atau alamat secara real-time, serta filter berdasarkan bidang keahlian/jurusan.
- **Menambahkan Data (Create)**: Modal formulir penambahan siswa baru dengan validasi field wajib dan kode unik.
- **Mengubah Data (Update)**: Modal edit data dengan data siswa yang terpilih otomatis terisi di dalam form.
- **Menghapus Data (Delete)**: Modal konfirmasi pencegahan penghapusan tidak sengaja sebelum data benar-benar dihapus dari database.
- **Notifikasi Toast**: Memberikan feedback interaktif visual (hijau untuk sukses, merah untuk error/gagal).
- **Statistik Cepat**: Kartu ringkasan total siswa, total jurusan, dan data siswa terbaru.

## Struktur Folder
```text
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Header & badge sertifikasi
│   │   ├── StatsCards.jsx     # Kartu statistik ringkasan
│   │   ├── SiswaTable.jsx     # Tabel data siswa & badge jurusan
│   │   ├── SiswaFormModal.jsx # Form modal Tambah/Edit data
│   │   ├── DeleteModal.jsx    # Dialog konfirmasi hapus data
│   │   └── Toast.jsx          # Notifikasi pop-up dinamis
│   ├── services/
│   │   └── siswaService.js    # Service API caller (fetch HTTP CRUD)
│   ├── App.jsx                # Komponen utama & manajemen state
│   ├── index.css              # Styling modern, responsif & rapi
│   └── main.jsx               # Root entry React
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Cara Menjalankan Frontend

1. **Instal dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000` (atau port yang ditentukan Vite).

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```
