
"use client";

import { useState, useEffect } from 'react';
import styles from './DailySales.module.css';
import DateID from '@/lib/dateId';
import { MantineProvider } from '@mantine/core';
import MonthPickerDropdown from './MonthPickerDropdown';

// --- Sampel Data dari Backend ---
const rawApiData = [
  {
    "timestamp": { "$date": "2025-09-19T13:46:55.853Z" },
    "total_kesuluruhan": 12000,
    "orders": [
      { "menu_id": { "$oid": "68c675dd92af3629e55f99e1" }, "name": "Nasi Goreng Royal", "kuantiti": 1, "sub_total": 12000, "modal": 10000, "subtotal_modal": 10000, "subtotal_margin": 2000 }
    ],
    "no_wa_pelanggan": "6281268778159",
    "total_margin_keseluruhan": 2000,
    "_id": "37fc93cf-011c-4c22-9e3d-b44e3f136c6e",
    "createdAt": { "$date": "2025-09-19T13:46:55.939Z" },
    "__v": 0,
    "total_modal_keseluruhan": 10000,
    "nama_pelanggan": "rheza",
    "updatedAt": { "$date": "2025-09-19T13:46:55.939Z" }
  },
  {
    "timestamp": { "$date": "2025-10-05T13:05:13.412Z" },
    "orders": [
      { "menu_id": { "$oid": "68c675dd92af3629e55f99e1" }, "name": "Nasi Goreng Royal", "kuantiti": 1, "sub_total": 12000, "modal": 10000, "subtotal_modal": 10000, "subtotal_margin": 2000 },
      { "menu_id": { "$oid": "68c675dd92af3629e55f99e2" }, "name": "Steak Sirloin", "kuantiti": 1, "sub_total": 11000, "modal": 10000, "subtotal_modal": 10000, "subtotal_margin": 1000 }
    ],
    "no_wa_pelanggan": "6285278971111",
    "nama_pelanggan": "Catur",
    "total_kesuluruhan": 23000,
    "createdAt": { "$date": "2025-10-05T13:05:13.558Z" },
    "total_margin_keseluruhan": 3000,
    "_id": "f87a8184-58bf-4d9b-8a1a-9bae0b4222d5",
    "updatedAt": { "$date": "2025-10-05T13:05:13.558Z" },
    "total_modal_keseluruhan": 20000,
    "__v": 0
  },
  {
    "timestamp": { "$date": "2025-10-05T18:00:00.000Z" },
    "total_kesuluruhan": 12000,
    "orders": [
      { "menu_id": { "$oid": "68c675dd92af3629e55f99e1" }, "name": "Nasi Goreng Royal", "kuantiti": 1, "sub_total": 12000, "modal": 10000, "subtotal_modal": 10000, "subtotal_margin": 2000 }
    ],
    "no_wa_pelanggan": "628111111111",
    "total_margin_keseluruhan": 2000,
    "_id": "aaaaaaaa-58bf-4d9b-8a1a-9bae0b4222d5",
    "total_modal_keseluruhan": 10000,
    "nama_pelanggan": "Siska",
  }
];

// --- Helper & Utility Functions ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number || 0);
};

// --- Child Component (Modal dengan Accordion) ---
function DailyDetailModal({ dayData, onClose }) {
  // State untuk accordion, dikelola di dalam modal ini
  const [openAccordionId, setOpenAccordionId] = useState(null);

  if (!dayData) return null;

  // Fungsi untuk membuka/menutup accordion
  const handleToggleAccordion = (transactionId) => {
    // Jika ID yang sama diklik lagi, tutup. Jika beda, buka yang baru.
    setOpenAccordionId(currentId => (currentId === transactionId ? null : transactionId));
  };

  return (
    <div className={styles.dailyModalBackdrop} onClick={onClose}>
      <div className={styles.dailyModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Rincian Transaksi Harian</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <h3>Tanggal: {dayData.formattedDate}</h3>
        <div>
          {dayData.transactions.map(transaction => (
            <div key={transaction._id} className={styles.transactionItem}>
              <p className={styles.transactionHeader}>Pelanggan: {transaction.nama_pelanggan || 'N/A'}</p>
              <div className={styles.transactionDetails}>
                <span><strong>No. WA:</strong> {transaction.no_wa_pelanggan || '-'}</span>
                <span><strong>Total:</strong> {formatRupiah(transaction.total_kesuluruhan)}</span>
                <span><strong>Modal:</strong> {formatRupiah(transaction.total_modal_keseluruhan)}</span>
                <span><strong>Margin:</strong> {formatRupiah(transaction.total_margin_keseluruhan)}</span>
              </div>
              <div className={styles.transactionActions}>
                <button className={styles.button} onClick={() => handleToggleAccordion(transaction._id)}>
                  {openAccordionId === transaction._id ? 'Tutup Detail' : 'Lihat Detail Order'}
                </button>
              </div>

              {/* Accordion Content: Muncul jika ID transaksi cocok dengan state */}
              {openAccordionId === transaction._id && (
                <div className={styles.accordionContent}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>Menu</th>
                        <th className={styles.th}>Kuantiti</th>
                        <th className={styles.th}>Sub-Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transaction.orders.map((order, index) => (
                        <tr key={index}>
                          <td className={styles.td}>{order.name}</td>
                          <td className={styles.td}>{order.kuantiti}</td>
                          <td className={styles.td}>{formatRupiah(order.sub_total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.modalFooter}>
          <strong>Total Penjualan Hari Ini: {formatRupiah(dayData.totalSales)}</strong>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
function DailySalesContent() {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setAggregatedData([]);

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;

      const endpoint = `/api/sales?year=${year}&month=${month}`;
      console.log(`MOCKUP: Akan memanggil endpoint: ${endpoint}`);

      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredData = rawApiData.filter(item => {
        const itemDate = new Date(item.timestamp.$date);
        return itemDate.getFullYear() === year && (itemDate.getMonth() + 1) === month;
      });

      processAndSetData(filteredData);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedDate]);

  const processAndSetData = (transactions) => {
    if (!transactions || transactions.length === 0) {
      setAggregatedData([]);
      return;
    }
    const dailyGroups = transactions.reduce((acc, transaction) => {
      const dateKey = new Date(transaction.timestamp.$date).toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = { date: new Date(transaction.timestamp.$date), formattedDate: new DateID(transaction.timestamp.$date).format('d-MMM-yyyy'), totalSales: 0, totalMargin: 0, totalModal: 0, transactions: [] };
      }
      acc[dateKey].totalSales += transaction.total_kesuluruhan;
      acc[dateKey].totalMargin += transaction.total_margin_keseluruhan;
      acc[dateKey].totalModal += transaction.total_modal_keseluruhan;
      acc[dateKey].transactions.push(transaction);
      return acc;
    }, {});
    const sortedData = Object.values(dailyGroups).sort((a, b) => b.date - a.date);
    setAggregatedData(sortedData);
  };

  return (
    <div className={styles.container}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 className={styles.title}>Ringkasan Penjualan Bulanan</h2>
        <div className={styles.controlsContainer}>
          <MonthPickerDropdown
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </div>
      </div>

      {isLoading ? (
        <p style={{textAlign: 'center', margin: '2rem'}}>Memuat data...</p>
      ) : (
        <ul className={styles.list}>
            <li className={`${styles.listItem} ${styles.dateText}`}>
                <span>Tanggal</span>
                <span>Total Margin</span>
                <span>Total Penjualan</span>
                <span></span>
            </li>
            {aggregatedData.length > 0 ? (
                aggregatedData.map((day) => (
                <li key={day.date} className={styles.listItem}>
                    <span className={styles.dateText}>{day.formattedDate}</span>
                    <span className={styles.marginText}>{formatRupiah(day.totalMargin)}</span>
                    <span className={styles.totalText}>{formatRupiah(day.totalSales)}</span>
                    <button className={styles.button} onClick={() => setSelectedDay(day)}>
                    Rincian
                    </button>
                </li>
                ))
            ) : (
                <p style={{textAlign: 'center', margin: '2rem'}}>Tidak ada data untuk periode ini.</p>
            )}
        </ul>
      )}

      {/* Modal hanya memanggil DailyDetailModal */}
      <DailyDetailModal 
        dayData={selectedDay} 
        onClose={() => setSelectedDay(null)} 
      />
    </div>
  );
}

export default function DailySales() {
  return (
    <MantineProvider>
      <DailySalesContent />
    </MantineProvider>
  );
}
