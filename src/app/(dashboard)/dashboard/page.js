
"use client";

import { useRouter } from 'next/navigation';
import DateID from '@/lib/dateId';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Logika BARU: Hapus accessToken dari localStorage secara langsung
    localStorage.removeItem('accessToken');
    console.log('Logout berhasil, token dihapus dari localStorage.');
    router.push('/login');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Selamat Datang di Dashboard Utama</h1>
      <p>Ini adalah catatan penjualan.</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
        <h3>Data Penjualan Hari Ini {new DateID().format('d-MMM-yyyy')}</h3>
        <p>Nasi Goreng: 25 porsi</p>
        <p>Es Teh Manis: 40 gelas</p>
      </div>

      <button 
        onClick={handleLogout} 
        style={{ marginTop: '2rem', backgroundColor: 'crimson', color: 'white' }}
      >
        Logout
      </button>
    </main>
  );
}
