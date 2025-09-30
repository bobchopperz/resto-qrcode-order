
"use client"; // Tandai sebagai Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Dapatkan router untuk navigasi

  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah form dari refresh halaman

    // --- SIMULASI LOGIN ---
    // Di aplikasi nyata, di sini Anda akan mengirim `email` dan `password` ke API.
    // Jika API merespons dengan sukses, Anda akan mendapatkan token.
    // Untuk sekarang, kita anggap login selalu berhasil.
    console.log('Login berhasil untuk:', email);

    // Simpan status login di localStorage browser.
    // Ini adalah cara kita "mengingat" pengguna di seluruh halaman.
    localStorage.setItem('isLoggedIn', 'true');

    // Arahkan pengguna ke halaman dashboard setelah login berhasil.
    router.push('/dashboard');
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Login ke Dashboard</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem' }}>
          Login
        </button>
      </form>
    </main>
  );
}
