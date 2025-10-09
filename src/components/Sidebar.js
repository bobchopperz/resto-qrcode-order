"use client";

import Link from 'next/link';
import styles from './Sidebar.module.css';
import { ChevronLeft, LayoutDashboard, ClipboardList, BarChart2, Salad } from 'lucide-react';

// Daftar menu untuk sidebar
const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/dashboard/menu', label: 'Menu', icon: <ClipboardList size={20} /> },
  { href: '/dashboard/sales', label: 'Penjualan', icon: <BarChart2 size={20} /> },
];

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <Salad size={30} className={styles.logoIcon} />
          {!isCollapsed && <span className={styles.logoText}>Resto Admin</span>}
        </div>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
          <ChevronLeft size={20} />
        </button>
      </div>
      <nav className={styles.sidebarNav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.menuLink}>
                {item.icon}
                {!isCollapsed && <span className={styles.menuLabel}>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
