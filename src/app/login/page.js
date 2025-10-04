
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Ganti dengan URL base backend Anda.
const API_BASE_URL = 'http://localhost:3001'; // Asumsi backend berjalan di port 3001

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Mencoba login dengan username:', username);

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login gagal.');
      }

      // Logika BARU: Simpan access_token dari respons JSON ke localStorage
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        console.log('Login berhasil, token disimpan di localStorage.');
        router.push('/dashboard');
      } else {
        throw new Error('Token tidak ditemukan di dalam respons dari server.');
      }

    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      alert(error.message);
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h1>Login ke Dashboard</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
