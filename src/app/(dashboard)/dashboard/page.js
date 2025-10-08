
"use client";

import { useRouter } from 'next/navigation';
import DailySales from '@/components/DailySales'; // 1. Import komponen baru

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Logika logout Anda (menghapus cookie via API atau localStorage)
    // Untuk sekarang, kita asumsikan ini sudah benar
    localStorage.removeItem('accessToken'); // Atau panggil API logout
    router.push('/login');
  };

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bakso Sedap Nikmat</h1>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: 'crimson', 
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <p>Selamat datang, berikut adalah ringkasan penjualan Anda.</p>
      
      {/* 2. Tampilkan komponen DailySales di sini */}
      <div style={{ marginTop: '2rem' }}>
        <DailySales />
      </div>

    </main>
  );
}
