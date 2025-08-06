import React from 'react';
import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <img
            className={styles.headerimage}
            src="/assets/logobebe.png"
            alt="Chechomatic Logo"
          />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.headertitle}>Chechomatic</h1>
          <p className={styles.headersubtitle}>Optimización de Fortificación de Leche Humana</p>
        </div>
      </div>

      <div className={styles.navigation}>
        <div className={styles.navItem} disabled>Inicio</div>
        <div className={`${styles.navItem} ${styles.navItemActive}`}>Calculadora</div>
        <div className={styles.navItem} disabled>Ayuda</div>
      </div>
    </header>
  );
}

export default Header;
