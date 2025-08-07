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
      case 'proteina': {
        // Escala basada en peso típico de prematuros (1-3 kg) y target 3.5-4.5
        const maxProteina = resultados.detalles.pesoKg * 4.5; // 13.5g para bebé de 3kg con target alto
        return Math.min(100, (valor / maxProteina) * 100);
      }
      case 'lipidos': {
        // Escala basada en peso típico de prematuros (1-3 kg) y target 4.8 y 8.1
        if (!resultados.detalles || !resultados.detalles.pesoKg) return 0;
        const maxLipidos = resultados.detalles.pesoKg * 8.1; // 
        return Math.min(100, (valor / maxLipidos) * 100);
      }
      case 'carbohidratos': {
        // Escala basada en peso típico de prematuros (1-3 kg) y target 11 y 15
        const maxCarbohidratos = resultados.detalles.pesoKg * 15; //
        return Math.min(100, (valor / maxCarbohidratos) * 100);
      }
      
      case 'energia': {
        // Escala basada en rango objetivo 115-140 kcal/kg/día
        const maxEnergia = 150; // Un poco por encima del máximo recomendado
        return Math.min(100, (valor / maxEnergia) * 100);
      }
      default:
        return 0;
    }
  };

  // Función para obtener el porcentaje del objetivo alcanzado
const obtenerPorcentajeObjetivo = (tipo, resultados) => {
  if (!resultados || !resultados.detalles) return '';

  switch (tipo) {
    case 'proteina': {
      const valorProteico = resultados.aporteProteicoTotal ?? 0;
      const pesoKg = resultados.detalles.pesoKg ?? 1;
      const porcentajeProteina = valorProteico > 0 && pesoKg > 0
        ? (valorProteico / pesoKg)
        : 0;
      if (porcentajeProteina >= 3.5 && porcentajeProteina <= 4.5) return '(Dentro del rango)';
      if (porcentajeProteina < 3.5) return '(Por debajo del mínimo)';
      return '(Por encima del máximo)';
    }

    /*case 'concentracion': {
      const valorConcentracion = resultados.gramosLiofNecesarios ?? 0;
      if (valorConcentracion > 5) return '(⚠ Por encima del límite)';
      if (valorConcentracion > 4) return '(Alto)';
      if (valorConcentracion > 2) return '(Óptimo)';
      return '(Bajo)';
    } */

    case 'energia': {
      const valorEnergia = resultados.densidadEnergetica ?? 0;
      if (valorEnergia >= 115 && valorEnergia <= 140) return '(Dentro del rango)';
      if (valorEnergia < 115) return '(Por debajo del mínimo)';
      return '(Por encima del máximo)';
    }

    case 'lipidos': {
      const valorLipidos = resultados.aporteLipidicoTotal ?? 0;
      const pesoKg = resultados.detalles.pesoKg ?? 1;
      const porcentajeLipidos = valorLipidos > 0 && pesoKg > 0
        ? (valorLipidos / pesoKg)
        : 0;
      if (porcentajeLipidos >= 4.8 && porcentajeLipidos <= 8.1) return '(Dentro del rango)';
      if (porcentajeLipidos < 4.8) return '(Por debajo del mínimo)';
      return '(Por encima del máximo)';
    }

    case 'carbohidratos': {
      const valorCarbohidratos = resultados.aporteCarbohidratosTotal ?? 0;
      const pesoKg = resultados.detalles.pesoKg ?? 1;
      const porcentajeCarbohidratos = valorCarbohidratos > 0 && pesoKg > 0
        ? (valorCarbohidratos / pesoKg)
        : 0;
      if (porcentajeCarbohidratos >= 11 && porcentajeCarbohidratos <= 15) return '(Dentro del rango)';
      if (porcentajeCarbohidratos < 11) return '(Por debajo del mínimo)';
      return '(Por encima del máximo)';
    }

    default:
      return '';
  }
}

// Ejemplos de uso:
// obtenerPorcentajeObjetivo('proteina', resultados)
// obtenerPorcentajeObjetivo('energia', resultados) 
// obtenerPorcentajeObjetivo('lipidos', resultados)
// obtenerPorcentajeObjetivo('carbohidratos', resultados)
// obtenerPorcentajeObjetivo('concentracion', resultados)

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
                style={{ width: `${calcularPorcentajeBarra(resultados.aporteProteicoTotal, 'proteina')}%`,
                 backgroundColor:
                    resultados.aporteProteicoTotal < 3.5
                     ? '#f6ad55' // 🔶 Color para valores < 115
                     : resultados.aporteProteicoTotal <= 4.5
                     ? '#38a169' // ✅ Color para valores entre 115 y 140 (inclusive)
                     : '#e53e3e' // ❌ Color para valores > 140
                 }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.aporteProteicoTotal} g/día {obtenerPorcentajeObjetivo('proteina', resultados)}
            </p>
          </div>

          {/* Resultado 2 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.2 Aporte Lipidico Total</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${calcularPorcentajeBarra(resultados.aporteLipidicoTotal, 'lipidos')}%`,
                  backgroundColor:
                    resultados.aporteLipidicoTotal < 4.8
                     ? '#f6ad55' // 🔶 Color para valores < 115
                     : resultados.aporteLipidicoTotal <= 8.1
                     ? '#38a169' // ✅ Color para valores entre 115 y 140 (inclusive)
                     : '#e53e3e' // ❌ Color para valores > 140
                }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.aporteLipidicoTotal} g/día {obtenerPorcentajeObjetivo('lipidos', resultados)}
            </p>
          </div>

          {/* Resultado 3 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.3 Aporte carbohidratos Total</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ 
                  width: `${calcularPorcentajeBarra(resultados.aporteCarbohidratosTotal, 'carbohidratos')}%`,
                  backgroundColor:
                    resultados.aporteCarbohidratosTotal < 11
                     ? '#f6ad55' // 🔶 Color para valores < 115
                     : resultados.aporteCarbohidratosTotal <= 15
                     ? '#38a169' // ✅ Color para valores entre 115 y 140 (inclusive)
                     : '#e53e3e' // ❌ Color para valores > 140
                }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.aporteCarbohidratosTotal} g/día {obtenerPorcentajeObjetivo('carbohidratos', resultados)}
            </p>
          </div>

          {/* Resultado 4 */}
          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.4 Gramos de Fortificador a Agregar </h4>
            <div className={styles.circuloValor}>
              {resultados.gramosLiofNecesarios}
               {/*<span className={styles.unidad}></span>*/}
            </div>
            <p className={styles.resultadoValue}>
              {obtenerPorcentajeObjetivo('concentracion', resultados)}
            </p>
          </div>

          {/* Resultado 5*/}

          <div className={styles.resultadoItem}>
            <h4 className={styles.resultadoLabel}>2.5 Densidad Energética</h4>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ 
                  width: `${calcularPorcentajeBarra(resultados.densidadEnergetica, 'energia')}%`,
                  backgroundColor:
                    resultados.densidadEnergetica < 115
                     ? '#f6ad55' // 🔶 Color para valores < 115
                     : resultados.densidadEnergetica <= 140
                     ? '#38a169' // ✅ Color para valores entre 115 y 140 (inclusive)
                     : '#e53e3e' // ❌ Color para valores > 140
                }}
              ></div>
            </div>
            <p className={styles.resultadoValue}>
              {resultados.densidadEnergetica} kcal/kg/día {obtenerPorcentajeObjetivo('energia', resultados)}
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
                    <p><strong>Aporte proteico leche:</strong> {resultados.detalles.aporteLeche} g/día</p>
                    <p><strong>Aporte proteico fortificador:</strong> {resultados.detalles.aporteFortificador} g/día</p>
                    <p><strong>Composición usada:</strong> P:{resultados.detalles.composicionUsada?.proteina} Lac:{resultados.detalles.composicionUsada?.lactosa} Li:{resultados.detalles.composicionUsada?.lipidos}</p>
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
             <p>{`Complete los datos de entrada y presione "Calcular" para ver los resultados`}</p>
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
