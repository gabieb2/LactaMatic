import React from 'react';
import styles from './CalculadoraFortificacion.module.css';
import { useLactaTech } from '../context/LactaTechContext';
import EntradaDatos from './EntradaDatos';
import ResultadosCalculados from './ResultadosCalculados';

function CalculadoraFortificacion() {
  const { state } = useLactaTech();

  return (
    <div className={styles.calculadoraContainer}>
      <div className={styles.calculadoraHeader}>
        <h1 className={styles.calculadoraTitulo}>Calculadora de Fortificación Inteligente</h1>
        <p className={styles.calculadoraSubtitulo}>
          Sistema de optimización nutricional basado en evidencia clínica para prematuros
        </p>
      </div>
      
      <div className={styles.calculadoraContent}>
        <div className={styles.calculadoraPanels}>
          {/* Panel izquierdo - Entrada de datos */}
          <div className={`${styles.panel} ${styles.panelEntrada}`}>
            <div className={styles.stepIndicator}>
              <div className={styles.stepNumber}>1</div>
              <h2 className={styles.stepTitle}>Datos de Entrada</h2>
            </div>
            <EntradaDatos />
          </div>
          
          {/* Panel derecho - Resultados */}
          <div className={`${styles.panel} ${styles.panelResultados}`}>
            <div className={styles.stepIndicator}>
              <div className={styles.stepNumber}>2</div>
              <h2 className={styles.stepTitle}>Resultados Calculados</h2>
            </div>
            <ResultadosCalculados />
          </div>
        </div>
        
        {/* Indicador de estado */}
        <div className={styles.calculadoraFooter}>
          <div className={styles.statusIndicator}>
            <div className={styles.statusDot}></div>
            <span className={styles.statusText}>Cálculo basado en algoritmo validado clínicamente</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculadoraFortificacion;
