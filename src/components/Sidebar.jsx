import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/projects', label: 'Projects', icon: '📁' },
    { path: '/issues', label: 'Issues', icon: '🐛' },
    { path: '/create-project', label: 'Create Project', icon: '➕' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <button 
        className={styles.hamburgerButton}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <div className={styles.hamburgerIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Task Board</h2>
          <button 
            className={styles.closeButton}
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
              onClick={closeSidebar}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 