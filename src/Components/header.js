import React from 'react';
import styles from './header.module.css'; // Asegúrate de que el archivo CSS está en la ruta correcta

function Header() {
  return (
    <header className={styles.header}> {/* Asegúrate de que uses 'className' en lugar de 'class' */}
    <img className={styles.headerimage} src="/assets/logobebe.png" alt="Descripción de la imagen"  />
    <h1 className={styles.headertitle}>CHECHOMATIC INC.</h1>
    </header>
  );
}

export default Header;
