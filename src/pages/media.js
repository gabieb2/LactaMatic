import Head from 'next/head'
import Header from '../Components/header.js'
import CalculadoraFortificacion from '../Components/CalculadoraFortificacion.js'
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

        <div style={{ position: "relative", width: "100%", paddingBottom: "150%", height: 0 }}>
          <iframe
            src="https://uncinnova.unc.edu.ar/servicio-de-asistencia-tecnica-y-cientifica-para-bancos-de-leche-humana/"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allowFullScreen
            title="Nota"
          />        
        </div>
      </main>
      </div>
    </div>


  )
}
