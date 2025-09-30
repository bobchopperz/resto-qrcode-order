
"use client"; // Layout ini butuh interaksi client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Layout ini menerima 'children', yaitu halaman yang akan ditampilkan (misal: page.js)
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!userIsLoggedIn) {
      router.replace('/login');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Tampilkan loading selama pengecekan
  if (isChecking) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Memeriksa otorisasi...</p>;
  }

  // Jika sudah lolos, tampilkan halaman yang diminta (children)
  return <>{children}</>;
}
