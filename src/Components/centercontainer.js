import React from 'react';
import styles from './centercontainer.module.css';  // Si tienes un archivo CSS externo, o puedes aplicar estilos en línea

function CenterContainer() {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.ayudaContainer}>
        <div className={styles.ayudaTitulo}>
          <h2>Centro de Ayuda de Chechomatic</h2>
        </div>

        <p className={styles.ayudaDescripcion}>
          Bienvenido al asistente de uso de la Calculadora de Fortificación de Leche Humana. Aquí te explicamos cómo utilizarla paso a paso.
        </p>

        {/* Índice / Tabla de contenidos */}
        <nav className={styles.ayudaIndice}>
          <ul>
            <li><a href="#que-es">¿Qué es Chechomatic?</a></li>
            <li><a href="#como-usar">¿Cómo usar la calculadora?</a></li>
            <li><a href="#interpretacion">Interpretación de los resultados</a></li>
            <li><a href="#ejemplo-practico">Ejemplo práctico</a></li>
            <li><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>
            <li><a href="#mas-ayuda">¿Necesitás más ayuda?</a></li>
          </ul>
        </nav>

        <section id="que-es">
          <h3 className={styles.ayudaTitulo}>¿Qué es Chechomatic?</h3>
          <p className={styles.ayudaDescripcion}>
            Es una herramienta que ayuda a profesionales de la salud a calcular la fortificación adecuada de leche humana para bebés prematuros, según el aporte energético y proteico recomendado.
          </p>
          <p className={styles.ayudaDescripcion}>
            Todos los valores fueron obtenidos de la guía de nutrición enteral ESPGHAN.
          </p>
        </section>

        <section id="como-usar">
          <h3 className={styles.ayudaTitulo}>¿Cómo usar la calculadora?</h3>
          <ol className={styles.ayudaLista}>
            <li>Ingresá los valores de análisis de la leche: <strong>proteínas</strong>, <strong>grasa</strong> y <strong>lactosa</strong>.</li>
            <li>Seleccioná el fortificador que utilizás.</li>
            <li>La calculadora te mostrará los valores resultantes: densidad energética, aporte proteico, de carbohidratos, lipídico y gramos de fortificador a añadir.</li>
          </ol>
        </section>

        <section id="interpretacion">
          <h3 className={styles.ayudaTitulo}>Interpretación de los resultados</h3>
          <ul className={styles.ayudaLista}>
            <li><strong>Verde:</strong> dentro del rango recomendado.</li>
            <li><strong>Naranja:</strong> por debajo del rango.</li>
            <li><strong>Rojo:</strong> Por arriba de los rangos máximos recomendados.</li>
          </ul>
        </section>

        <section id="ejemplo-practico">
          <h3 className={styles.ayudaTitulo}>Ejemplo práctico</h3>
          <p className={styles.ayudaDescripcion}>
            Ingresando: proteínas: 1.2 g, grasa: 4.5 g, lactosa: 6.8 g, la calculadora indicará una densidad energética de 72 kcal/100ml y recomendará la cantidad de fortificador ideal.
          </p>
        </section>

        <section id="preguntas-frecuentes">
          <h3 className={styles.ayudaTitulo}>Preguntas frecuentes</h3>
          
          <p className={styles.ayudaDescripcion}>
            <strong>¿Qué pasa si no tengo todos los datos?</strong><br />
            <br />
            Puedes utilizar un valor estimado según el tipo de puerperio (término/pretérmino) así como los días de vida del bebé, pero ten en cuenta que la precisión de los resultados puede verse afectada.
          </p>
        </section>

        <section id="mas-ayuda">
          <h3 className={styles.ayudaTitulo}>¿Necesitás más ayuda?</h3>
          <p className={styles.ayudaDescripcion}>
            Contactanos a <a href="mailto:gabriel.beinotti@unc.edu.ar">gabriel.beinotti@unc.edu.ar</a> o consultá la documentación técnica completa.
          </p>
        </section>
      </div>
    </div>
  );
}


export default CenterContainer;
