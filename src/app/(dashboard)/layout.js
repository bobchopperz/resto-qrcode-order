
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Logika BARU: Periksa keberadaan access token di localStorage secara langsung
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Jika tidak ada token, tendang kembali ke halaman login.
      console.log('Tidak ada token di localStorage, mengarahkan ke login.');
      router.replace('/login');
    } else {
      // Jika token ditemukan, izinkan akses.
      console.log('Token ditemukan di localStorage, mengizinkan akses.');
      setIsChecking(false);
    }
  }, [router]); // Jalankan efek ini jika router berubah.

  // Selama pengecekan, tampilkan pesan loading.
  if (isChecking) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Memeriksa otorisasi...</p>;
  }

  // Jika sudah lolos pengecekan, tampilkan konten dashboard.
  return <>{children}</>;
}
