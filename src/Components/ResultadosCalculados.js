import React from 'react';
import styles from './ResultadosCalculados.module.css';
import { useLactaTech } from '../context/LactaTechContext';

function ResultadosCalculados() {
  const { state, calcularFortificacion, resetear } = useLactaTech();
  const { resultados, ui } = state;

  const handleCalcular = () => {
    calcularFortificacion();
  };

  const handleReset = () => {
    resetear();
  };

  // Función para calcular porcentajes de barras de progreso dinámicamente
  const calcularPorcentajeBarra = (valor, tipo) => {
    switch (tipo) {
      case 'proteina':
        // Escala basada en peso típico de prematuros (1-3 kg) y target 3.5-4.5
        const maxProteina = 3 * 4.5; // 13.5g para bebé de 3kg con target alto
        return Math.min(100, (valor / maxProteina) * 100);
      
      case 'concentracion':
        // Escala hasta 6 g/100ml (por encima del límite de seguridad de 5)
        return Math.min(100, (valor / 6) * 100);
      
      case 'energia':
        // Escala basada en rango objetivo 115-140 kcal/kg/día
        const maxEnergia = 150; // Un poco por encima del máximo recomendado
        return Math.min(100, (valor / maxEnergia) * 100);
      
      default:
        return 0;
    }
  };

  // Función para obtener el porcentaje del objetivo alcanzado
  const obtenerPorcentajeObjetivo = (valor, tipo) => {
    if (!resultados.detalles) return '';
    
    switch (tipo) {
      case 'proteina':
        const porcentajeProteina = resultados.detalles.requerimientoProteinas > 0 ? 
          (valor / resultados.detalles.requerimientoProteinas) * 100 : 0;
        return `(${Math.round(porcentajeProteina)}% objetivo)`;
      
      case 'concentracion':
        if (valor > 5) return '(⚠ Por encima del límite)';
        if (valor > 4) return '(Alto)';
        if (valor > 2) return '(Óptimo)';
        return '(Bajo)';
      
      case 'energia':
        if (valor >= 115 && valor <= 140) return '(Dentro del rango)';
        if (valor < 115) return '(Por debajo del mínimo)';
        return '(Por encima del máximo)';
      
      default:
        return '';
    }
  };

  return (
    <div className={styles.resultadosCalculados}>
      {ui.mostrarResultados ? (
        <div className={styles.resultadosContent}>
          {/* Resultado 1 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.1 Aporte Proteico Total</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${calcularPorcentajeBarra(resultados.aporteProteicoTotal, 'proteina')}%` }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.aporteProteicoTotal} g/día {obtenerPorcentajeObjetivo(resultados.aporteProteicoTotal, 'proteina')}
            </p>
          </div>

          {/* Resultado 2 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.2 Concentración Fortificador</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ 
                  width: `${calcularPorcentajeBarra(resultados.concentracionFortificador, 'concentracion')}%`,
                  backgroundColor: resultados.concentracionFortificador > 5 ? '#e53e3e' : '#4299e1'
                }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.concentracionFortificador} g/100ml {obtenerPorcentajeObjetivo(resultados.concentracionFortificador, 'concentracion')}
            </p>
          </div>

          {/* Resultado 3 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.3 Densidad Energética</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ 
                  width: `${calcularPorcentajeBarra(resultados.densidadEnergetica, 'energia')}%`,
                  backgroundColor: (resultados.densidadEnergetica >= 115 && resultados.densidadEnergetica <= 140) ? '#38a169' : '#4299e1'
                }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.densidadEnergetica} kcal/kg/día {obtenerPorcentajeObjetivo(resultados.densidadEnergetica, 'energia')}
            </p>
          </div>

          {/* Resultado Final */}
          <div className={`${styles.resultadoFinal} ${resultados.esOptimo ? styles.optimo : styles.suboptimo}`}>
            <div className={styles.resultadoFinalContent}>
              <h4 className={styles.resultadoFinalTitle}>2.4 Fortificación Calculada</h4>
              <p className={styles.resultadoFinalStatus}>
                {resultados.esOptimo ? '✓ Dentro de rangos seguros' : '⚠ Revisar parámetros'}
              </p>
              <p className={styles.resultadoFinalDetalle}>
                Vol. fortificador: {resultados.volumenFortificador} ml/100ml leche
              </p>
              <p className={styles.resultadoFinalDetalle}>
                Densidad: 1.4 g/ml aplicada
              </p>
              {resultados.detalles && (
                <details className={styles.detallesCalculos}>
                  <summary className={styles.detallesSummary}>Ver detalles del cálculo</summary>
                  <div className={styles.detallesContent}>
                    <p><strong>Requerimiento:</strong> {resultados.detalles.requerimientoProteinas} g/día</p>
                    <p><strong>Aporte leche:</strong> {resultados.detalles.aporteLeche} g/día</p>
                    <p><strong>Aporte fortificador:</strong> {resultados.detalles.aporteFortificador} g/día</p>
                    <p><strong>Composición usada:</strong> P:{resultados.detalles.composicionUsada?.proteina} L:{resultados.detalles.composicionUsada?.lactosa} Li:{resultados.detalles.composicionUsada?.lipidos}</p>
                  </div>
                </details>
              )}
            </div>
            <div className={styles.resultadoFinalPorcentaje}>
              <span className={styles.porcentajeNumero}>{resultados.optimizacionAlcanzada}%</span>
              <span className={styles.porcentajeLabel}>Optimización</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.sinResultados}>
          <div className={styles.placeholderContent}>
            <h4>Esperando cálculo...</h4>
            <p>Complete los datos de entrada y presione "Calcular" para ver los resultados</p>
          </div>
        </div>
      )}

      {/* Área de acción */}
      <div className={styles.accionArea}>
        {/* Barra de progreso del proceso */}
        <div className={styles.progressTotal}>
          <div className={`${styles.progressFillTotal} ${ui.mostrarResultados ? styles.complete : ''}`}></div>
        </div>

        {/* Botones de acción */}
        <div className={styles.botonesAccion}>
          <button 
            className={styles.btnCalcular}
            onClick={handleCalcular}
            disabled={ui.calculando}
          >
            {ui.calculando ? (
              <>
                <div className={styles.loadingSpinner}></div>
                Calculando...
              </>
            ) : (
              <>
                <div className={styles.btnIcon}>+</div>
                CALCULAR FORTIFICACIÓN
              </>
            )}
          </button>

          {ui.mostrarResultados && (
            <button 
              className={styles.btnReset}
              onClick={handleReset}
            >
              Nuevo Cálculo
            </button>
          )}
        </div>

        {/* Errores */}
        {ui.errores.calculo && (
          <div className={styles.errorMessage}>
            {ui.errores.calculo}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultadosCalculados;
