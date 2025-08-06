import Head from 'next/head'
import Header from '../Components/header'
import CalculadoraFortificacion from '../Components/CalculadoraFortificacion'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chechomatic - Calculadora de Fortificación</title>
        <meta name="description" content="Calculadora inteligente de fortificación de leche humana para prematuros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.app}>
        <Header />
        <main className={styles.mainContent}>
          <CalculadoraFortificacion />
        </main>
      </div>
    </div>
  )
}
