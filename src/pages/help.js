import React from 'react';
import Head from 'next/head';
import Header from '../Components/header'; // corregí a minúscula si tu carpeta es 'components'
import styles from '../styles/Home.module.css';
import HelpContainer from '../Components/helpContainer';


function Ayuda() {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Lactamatic - Ayuda</title>
        <meta name="description" content="Guía para utilizar la calculadora de fortificación de leche humana para prematuros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Contenedor centrado para la ayuda */}
      <main className={styles.pageContainer}>
        <HelpContainer />
      </main>
    </div>
  );
}

export default Ayuda;
