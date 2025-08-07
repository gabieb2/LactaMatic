import React from 'react';
import Head from 'next/head';
import Header from '../Components/header'; // corregí a minúscula si tu carpeta es 'components'
import styles from '../styles/Home.module.css';

function Ayuda() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chechomatic - Ayuda</title>
        <meta name="description" content="Guía para utilizar la calculadora de fortificación de leche humana para prematuros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.app}>
        <Header />

        <main className={styles.mainContent}>
          <h2>Centro de Ayuda de Chechomatic</h2>
          <p>Bienvenido al asistente de uso de la Calculadora de Fortificación de Leche Humana. Aquí te explicamos cómo utilizarla paso a paso.</p>

          <section>
            <h3>¿Qué es Chechomatic?</h3>
            <p>Es una herramienta que ayuda a profesionales de la salud a calcular la fortificación adecuada de leche humana para bebés prematuros, según el aporte energético y proteico recomendado.</p>
            <p>Todos los valores fueron obtenidos de la guía de nutrición enteral ESPGHAN.</p>

          </section>

          <section>
            <h3>¿Cómo usar la calculadora?</h3>
            <ol>
              <li>Ingresá los valores de análisis de la leche: <strong>proteínas</strong>, <strong>grasa</strong> y <strong>lactosa</strong>.</li>
              <li>Seleccioná el fortificador que utilizás.</li>
              <li>La calculadora te mostrará los valores resultantes: densidad energética, aporte proteico, de carbohidratos, lipídico y recomendaciones.</li>
            </ol>
          </section>

          <section>
            <h3>Interpretación de los resultados</h3>
            <ul>
              <li><strong>Verde:</strong> dentro del rango recomendado.</li>
              <li><strong>Naranja:</strong> por debajo del rango.</li>
              <li><strong>Rojo:</strong> Por arriba de los rangos máximos recomendados .</li>
            </ul>
          </section>

          <section>
            <h3>Ejemplo práctico</h3>
            <p>Ingresando: proteínas: 1.2 g, grasa: 4.5 g, lactosa: 6.8 g, la calculadora indicará una densidad energética de 72 kcal/100ml y recomendará la cantidad de fortificador ideal.</p>
          </section>

          <section>
            <h3>Preguntas frecuentes</h3>
            <p><strong>¿Puedo usarla con cualquier tipo de leche?</strong><br />
            Actualmente está pensada para leche humana analizada por métodos como MIRIS o similares.</p>

            <p><strong>¿Qué pasa si no tengo todos los datos?</strong><br />
            La calculadora necesita los tres valores nutricionales para funcionar correctamente. Se recomienda no estimarlos.</p>
          </section>

          <section>
            <h3>¿Necesitás más ayuda?</h3>
            <p>Contactanos a <a href="mailto:gabriel.beinotti@unc.edu.ar">gabriel.beinotti@unc.edu.ar</a> o consultá la documentación técnica completa.</p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Ayuda;
