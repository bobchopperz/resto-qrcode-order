"use client";

import { useState, useEffect } from 'react';
import styles from './MenuTable.module.css';
import { Plus, Edit, Trash2, Camera } from 'lucide-react';

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number || 0);
};

export default function MenuTable() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageToShow, setImageToShow] = useState(null); // State untuk modal gambar

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/menu`);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data menu. Status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Fungsi untuk mendapatkan nama file dari URL/path
  const getFilename = (path) => {
    if (!path) return 'Tidak ada gambar';
    return path.split('/').pop();
  };

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.header}>
        <h2>Daftar Menu</h2>
        <button className={styles.addButton}>
          <Plus size={18} />
          <span>Tambah Menu</span>
        </button>
      </div>
      {isLoading ? (
        <p>Memuat data menu...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nama Menu</th>
              <th>Deskripsi</th>
              <th>Modal</th>
              <th>Harga</th>
              <th>Image</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <tr key={item._id}>
                  <td data-label="Nama">{item.name}</td>
                  <td data-label="Deskripsi">{item.description}</td>
                  <td data-label="Modal">{formatRupiah(item.modal)}</td>
                  <td data-label="Harga">{formatRupiah(item.price)}</td>
                  <td data-label="Image">
                    <div className={styles.imageCell}>
                      <button
                        className={`${styles.actionButton} ${styles.showButton}`}
                        onClick={() => setImageToShow(`${process.env.NEXT_PUBLIC_EXTERNAL_APACHE}${item.imageUrl}`)}
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                  </td>
                  <td data-label="Aksi">
                    <div className={styles.actionButtons}>
                      <button className={`${styles.actionButton} ${styles.editButton}`}>
                        <Edit size={16} />
                      </button>
                      <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>Belum ada menu.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal untuk menampilkan gambar */}
      {imageToShow && (
        <div className={styles.imageModalBackdrop} onClick={() => setImageToShow(null)}>
          <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.imageModalCloseButton} onClick={() => setImageToShow(null)}>×</button>
            <img src={imageToShow} alt="Pratinjau Menu" className={styles.imageModalPreview} />
          </div>
        </div>
      )}
    </div>
  );
}
