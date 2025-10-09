"use client";

import { useState } from 'react';
import styles from './MenuTable.module.css'; // Menggunakan CSS yang sama untuk modal
import { X } from 'lucide-react';

export default function AddMenuModal({ isOpen, onClose, onMenuAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modal, setModal] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('modal', modal);
    formData.append('price', price);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/menu`, {
        method: 'POST',
        body: formData, // FormData tidak perlu header Content-Type secara manual
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Gagal menambahkan menu.' }));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      alert('Menu berhasil ditambahkan!');
      onMenuAdded(); // Beri tahu parent untuk refresh data
      onClose(); // Tutup modal
      // Reset form
      setName('');
      setDescription('');
      setModal('');
      setPrice('');
      setImageFile(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding menu:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Tambah Menu Baru</h2>
          <button className={styles.modalCloseButton} onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className={styles.menuForm}>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="name">Nama Menu</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="modal">Modal (Rp)</label>
            <input
              type="number"
              id="modal"
              value={modal}
              onChange={(e) => setModal(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Harga Jual (Rp)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Gambar Menu</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isSubmitting}>Batal</button>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
