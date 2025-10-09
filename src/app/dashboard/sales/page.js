// src/app/dashboard/sales/page.js
import DailySales from '../../../components/DailySales';

export default function SalesPage() {
  return (
    <div>
      <h1>Laporan Penjualan Bulanan</h1>
      <DailySales />
    </div>
  );
}
