import React from 'react';
import styles from './header.module.css';
import Image from 'next/image'
import Link from 'next/link';

function Header() {
  // Define las variables que faltaban
  const ancho = 50;  // Ajusta el tamaño según necesites
  const alto = 50;   // Ajusta el tamaño según necesites

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <div className={styles.logoCircle}>
          <Image src="/assets/logobebe.png" alt="Descripción" width={ancho} height={alto} />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.headertitle}>Lactamatic</h1>
          <p className={styles.headersubtitle}>Optimización de Fortificación de Leche Humana</p>
        </div>
      </div>

      <div className={styles.navigation}>
        <Link href="inicio" className={styles.navItem}>Inicio</Link>
        <Link href="calculadora" className={`${styles.navItem} ${styles.navItemActive}`}>Calculadora</Link>
        <Link href="/help" className={styles.navItem}>Ayuda</Link>
      </div>
    </header>
  );
}
//

export default Header;