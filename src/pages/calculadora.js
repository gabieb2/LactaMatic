import React from 'react';
import Head from 'next/head';
import Header from '../Components/header'; // corregí a minúscula si tu carpeta es 'components'
import styles from '../styles/Home.module.css';import CalculadoraFortificacion from '../Components/CalculadoraFortificacion';

export default function CalculadoraPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lactamatic - Calculadora</title>
        <meta name="description" content="Calculadora de fortificación de leche humana para prematuros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CalculadoraFortificacion />
    </div>
  );
}
