import React from 'react';
import styles from './header.module.css';
import Image from 'next/image'

function Header() {
  // Define las variables que faltaban
  const ancho = 50;  // Ajusta el tamaño según necesites
  const alto = 50;   // Ajusta el tamaño según necesites

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <Image src="/path/to/image.png" alt="Descripción" width={ancho} height={alto} />
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