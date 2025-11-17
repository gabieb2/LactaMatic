import React from 'react';
import styles from './helpContainer.module.css';  // Si tienes un archivo CSS externo, o puedes aplicar estilos en línea
import Fortificador from '../Components/fortifier';

function helpContainer() {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.ayudaContainer}>
        <div className={styles.ayudaTitulo}>
          <h2>Centro de Ayuda de Lactamatic</h2>
        </div>

        

        <section id="Disclaimer">
          <p className={styles.ayudaDisclaimer}>
          <h3 className={styles.ayudaTitulo}>Advertencia</h3>
            Esta herramienta está destinada únicamente a profesionales de la salud. No debe ser utilizada como un sustituto del juicio clínico.
            El uso de esta herramienta debe ser complementado con la evaluación clínica del paciente y la consideración de las características individuales de cada caso.
          </p>
          

        </section>

        <p className={styles.ayudaDescripcion}>
          Bienvenido al asistente de uso de la Calculadora de Fortificación de Leche Humana. Aquí te explicamos cómo utilizarla paso a paso.
        </p>
        

        {/* Índice / Tabla de contenidos */}
        <nav className={styles.ayudaIndice}>
          <ul>
            <li><a href="#que-es">¿Qué es Lactomatic?</a></li>
            <li><a href="#como-usar">¿Cómo usar la calculadora?</a></li>
            <li><a href="#interpretacion">Interpretación de los resultados</a></li>
            <li><a href="#ejemplo-practico">Ejemplo práctico</a></li>
            <li><a href="#preguntas-frecuentes">Preguntas frecuentes</a></li>

            <li><a href="#mas-ayuda">¿Necesitás más ayuda?</a></li>
          </ul>
        </nav>
        

        <section id="que-es">
          <h3 className={styles.ayudaTitulo}>¿Qué es Lactamatic?</h3>
          <p className={styles.ayudaDescripcion}>
            Es una herramienta que ayuda a profesionales de la salud a calcular la fortificación adecuada de leche humana para bebés prematuros, según el aporte energético y proteico recomendado.
          </p>
          <p className={styles.ayudaDescripcion}>
            Todos los valores nutricionales recomendados fueron obtenidos de la guía de nutrición enteral ESPGHAN.
          </p>
          <div className={styles.citationBox}>
            <p>Los valores nutricionales recomendados se obtuvieron de la guía:</p>
            <blockquote cite="https://doi.org/10.1097/MPG.0000000000003642">
            <p>Embleton, N. D., et al. (2022). "Enteral Nutrition in Preterm Infants (2022): A Position Paper From the ESPGHAN Committee on Nutrition and Invited Experts". <em>Journal of Pediatric Gastroenterology and Nutrition</em>, 76(2), 248-268. <a href="https://doi.org/10.1097/MPG.0000000000003642" target="_blank">DOI: 10.1097/MPG.0000000000003642</a></p>
            </blockquote>
           </div>

    <div className={styles.citationBox}>  
            <p>Los datos de la composición de la Leche humana en función del tipo de puerperio y tiempo se obtuvieron del siguiente artículo científico:</p>
            <blockquote cite="https://doi.org/10.1186/1471-2431-14-216">
            <p>Gidrewicz, D. A., & Fenton, T. R. (2014). "A systematic review and meta-analysis of the nutrient content of preterm and term breast milk". <em>BMC Pediatrics</em>, 14(1), 216. DOI: <a href="https://doi.org/10.1186/1471-2431-14-216" target="_blank">10.1186/1471-2431-14-216</a></p>
  </blockquote>
</div>
        </section>

       




        <section id="como-usar">
          <h3 className={styles.ayudaTitulo}>¿Cómo usar la calculadora?</h3>
          <ol className={styles.ayudaLista}>
            <li>Seleccioná tu tipo de entrada (Datos medidos o estimados)</li>
            <li>Ingresa los parámetros del niño o los valores de análisis de la leche</li>
            <li>Seleccioná el fortificador que utilizás.</li>
            <li>Seleccioná el tipo de fortificación (Standard, ajustada por proteínas)</li>
            <li>La calculadora te mostrará la cantidad de fortificador a suministrar así como los valores resultantes: densidad energética, aporte proteico, de carbohidratos, lipídico y gramos de fortificador a añadir.</li>
          </ol>
        </section>

        <section id="interpretacion">
          <h3 className={styles.ayudaTitulo}>Interpretación de los resultados</h3>
          <ul className={styles.ayudaLista}>
            <li style={{ color: 'green' }}><strong>Verde:</strong> Dentro del rango recomendado.</li>
            <li style={{ color: 'orange' }}><strong>Naranja:</strong> Por debajo del rango.</li>
            <li style={{ color: 'red' }}><strong>Rojo:</strong> Por arriba de los rangos máximos recomendados.</li>
          </ul>
        </section>

        <section id="ejemplo-practico">
          <h3 className={styles.ayudaTitulo}>Ejemplo práctico</h3>
          <p className={styles.ayudaDescripcion}>
            Ingresando los parámetros medidos: proteínas: 1.2 g, grasa: 4.5 g, lactosa: 6.8 g, y suponiendo un peso de 1kg y una ingesta de 150ml/kg/día la calculadora indicará 6gramos de fortificador (si utilizamos la fortificación standard) así como 6.67 si usamos fortificación dirigida, con el objetivo de llegar a 4gr/kg/día de proteinas.
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

        <section id="tabla-fortificadores">
          <h3 className={styles.ayudaTitulo}>Tipos de fortificadores</h3>
          <Fortificador />
        </section>
      </div>
    </div>
  );
}


export default helpContainer;
