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

  /**
   * Calcula el porcentaje de llenado de la barra de progreso
   * mapeando el valor total o por kg a un rango visual.
   * @param {number} valorTotal - El valor nutricional total (e.g., g/día o kcal/día).
   * @param {string} tipo - El tipo de nutriente ('proteina', 'lipidos', 'carbohidratos', 'energia').
   * @returns {string} Porcentaje entre 0 y 100.
   */
  const calcularPorcentajeBarra = (valorTotal, tipo) => {
    if (!resultados.detalles || !resultados.detalles.pesoKg) return 0;
    
    // Usar valor por unidad de peso (excepto para Energía, que es por kg/día)
    const valor = (tipo === 'energia') 
      ? valorTotal 
      : valorTotal / resultados.detalles.pesoKg; 

    // Límites de visualización (amplios)
    const limitesVisuales = {
      proteina: { min: 2.5, max: 5.5 }, 
      lipidos: { min: 3.0, max: 10.0 }, 
      carbohidratos: { min: 9.0, max: 17.0 }, 
      energia: { min: 95, max: 165 }, 
    };

    const limites = limitesVisuales[tipo];

    if (!limites) return 0;
    
    // Fórmula de mapeo: (Valor - Min_Visual) / (Max_Visual - Min_Visual) * 100
    let porcentaje = ((valor - limites.min) / (limites.max - limites.min)) * 100;
    
    // Limitar el resultado entre 0% y 100%
    porcentaje = Math.max(0, Math.min(100, porcentaje));

    return porcentaje.toFixed(1);
  };

  /**
   * Determina el estado del objetivo nutricional.
   * @param {string} tipo - El tipo de nutriente.
   * @param {object} resultados - Objeto de resultados del cálculo.
   * @returns {string} Cadena de texto indicando si está 'Dentro del rango', 'Por debajo', o 'Por encima'.
   */
  const obtenerPorcentajeObjetivo = (tipo, resultados) => {
    if (!resultados || !resultados.detalles) return '';

    const pesoKg = resultados.detalles.pesoKg ?? 1;

    switch (tipo) {
      case 'proteina': {
        const porcentajeProteina = (resultados.aporteProteicoTotal ?? 0) / pesoKg;
        if (porcentajeProteina >= 3.5 && porcentajeProteina <= 4.5) return '(Dentro del rango)';
        if (porcentajeProteina < 3.5) return '(Por debajo del mínimo 3.5g/kg/día)';
        return '(Por encima del máximo 4.5g/kg/día)';
      }

      case 'lipidos': {
        const porcentajeLipidos = (resultados.aporteLipidicoTotal ?? 0) / pesoKg;
        if (porcentajeLipidos >= 4.8 && porcentajeLipidos <= 8.1) return '(Dentro del rango)';
        if (porcentajeLipidos < 4.8) return '(Por debajo del mínimo 4.8g/kg/día)';
        return '(Por encima del máximo 8.1g/kg/día)';
      }

      case 'carbohidratos': {
        const porcentajeCarbohidratos = (resultados.aporteCarbohidratosTotal ?? 0) / pesoKg;
        if (porcentajeCarbohidratos >= 11 && porcentajeCarbohidratos <= 15) return '(Dentro del rango)';
        if (porcentajeCarbohidratos < 11) return '(Por debajo del mínimo 11g/kg/día)';
        return '(Por encima del máximo 15g/kg/día )';
      }

      case 'energia': {
        const valorEnergia = resultados.densidadEnergetica ?? 0;
        if (valorEnergia >= 115 && valorEnergia <= 140) return '(Dentro del rango)';
        if (valorEnergia < 115) return '(Por debajo del mínimo 115kcal/kg/día)';
        return '(Por encima del máximo 140kcal/kg/día)';
      }
      
    

      default:
        return '';
    }
  }


    return (
    <div className={styles.resultadosCalculados}>
      {/* resultadosContent actúa como el contenedor principal de la grilla de resultados y el área de acción */}
      <div className={styles.resultadosContent}> 
      {/* Área de Acción (Ahora inmersa dentro de resultadosContent) */}
        <div className={styles.accionArea}>
          {/* Barra de progreso del proceso */}
          

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
          </div>

          {/* Errores */}
          {ui.errores.calculo && (
            <div className={styles.errorMessage}>
              {ui.errores.calculo}
            </div>
          )}
        </div>
        
        {ui.mostrarResultados ? (
          // Usando la clase resultadosGrid (asumiendo que la definiste para un layout de grilla)
          <div className={styles.resultadosGrid}> 
            {/* Resultado 1: Proteína */}
<div className={styles.resultadoItem}>
  <div className={styles.twoColumnLayout}>
    {/* Left Column (8 col) */}
    <div className={styles.mainProgressSection}>
      <h4 className={styles.resultadoLabel}>Aporte Proteico Total</h4>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${calcularPorcentajeBarra(resultados.aporteProteicoTotal, 'proteina')}%`,
            backgroundColor:
              (resultados.aporteProteicoTotal / resultados.detalles.pesoKg) < 3.5
                ? '#f6ad55'
                : (resultados.aporteProteicoTotal / resultados.detalles.pesoKg) <= 4.5
                ? '#38a169'
                : '#e53e3e',
          }}
        ></div>
      </div>
    </div>

    {/* Right Column (4 col) */}
    <div className={styles.rangeSection}>
      <div className={styles.rightColumnContent}> {/* New container */}
        <div className={styles.valueAndUnit}>
          <p className={styles.resultadoValue}>
            {resultados.aporteProteicoTotal}
          </p>
          <p className={styles.unitText}>g/día</p>
        </div>
        <div
          className={styles.rangeBox}
          style={{
            backgroundColor:
              (resultados.aporteProteicoTotal / resultados.detalles.pesoKg) < 3.5 ||
              (resultados.aporteProteicoTotal / resultados.detalles.pesoKg) > 4.5
                ? '#e53e3e' // Red for out of range
                : '#38a169', // Green for in range
          }}
        >
          <p className={styles.rangeText}>
            {obtenerPorcentajeObjetivo('proteina', resultados)}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
            <div className={styles.resultadoItem}>
  <div className={styles.twoColumnLayout}>
    <div className={styles.mainProgressSection}>
      <h4 className={styles.resultadoLabel}>Aporte Lipídico Total</h4>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${calcularPorcentajeBarra(resultados.aporteLipidicoTotal, 'lipidos')}%`,
            backgroundColor:
              (resultados.aporteLipidicoTotal / resultados.detalles.pesoKg) < 4.8
                ? '#f6ad55'
                : (resultados.aporteLipidicoTotal / resultados.detalles.pesoKg) <= 8.1
                ? '#38a169'
                : '#e53e3e',
          }}
        ></div>
      </div>
    </div>
     <div className={styles.rangeSection}>
      <div className={styles.rightColumnContent}> {/* New container */}
        <div className={styles.valueAndUnit}>
          <p className={styles.resultadoValue}>
            {resultados.aporteLipidicoTotal} g/día
          </p>
        </div>
        <div
          className={styles.rangeBox}
          style={{
            backgroundColor:
              (resultados.aporteLipidicoTotal / resultados.detalles.pesoKg) < 4.8 ||
              (resultados.aporteLipidicoTotal / resultados.detalles.pesoKg) > 8.1
                ? '#e53e3e'
                : '#38a169',
          }}
        >
          <p className={styles.rangeText}>
            {obtenerPorcentajeObjetivo('lipidos', resultados)}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

            <div className={styles.resultadoItem}>
  <div className={styles.twoColumnLayout}>
    <div className={styles.mainProgressSection}>
      <h4 className={styles.resultadoLabel}>Aporte Carbohidratos Total</h4>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${calcularPorcentajeBarra(resultados.aporteCarbohidratosTotal, 'carbohidratos')}%`,
            backgroundColor:
              (resultados.aporteCarbohidratosTotal / resultados.detalles.pesoKg) < 11
                ? '#f6ad55'
                : (resultados.aporteCarbohidratosTotal / resultados.detalles.pesoKg) <= 15
                ? '#38a169'
                : '#e53e3e',
          }}
        ></div>
      </div>
    </div>
    <div className={styles.rangeSection}>
      <div className={styles.rightColumnContent}> {/* New container */}
        <div className={styles.valueAndUnit}>
          <p className={styles.resultadoValue}>
            {resultados.aporteCarbohidratosTotal} g/día
          </p>
        </div>
        <div
          className={styles.rangeBox}
          style={{
            backgroundColor:
              (resultados.aporteCarbohidratosTotal / resultados.detalles.pesoKg) < 11 ||
              (resultados.aporteCarbohidratosTotal / resultados.detalles.pesoKg) > 15
                ? '#e53e3e'
                : '#38a169',
          }}
        >
          <p className={styles.rangeText}>
            {obtenerPorcentajeObjetivo('carbohidratos', resultados)}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Resultado 4: Gramos de Fortificador */}
            <div className={styles.resultadoItem}>
              <h4 className={styles.resultadoLabel}>Gramos de Fortificador a Agregar</h4>
              <div className={styles.circuloValor}>
                {resultados.gramosLiofNecesarios}
              </div>
              <p className={styles.resultadoValue}>
                {obtenerPorcentajeObjetivo('concentracion', resultados)}
              </p>
            </div>

           <div className={styles.resultadoItem}>
  <div className={styles.twoColumnLayout}>
    <div className={styles.mainProgressSection}>
      <h4 className={styles.resultadoLabel}>Densidad Energética</h4>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${calcularPorcentajeBarra(resultados.densidadEnergetica, 'energia')}%`,
            backgroundColor:
              resultados.densidadEnergetica < 115
                ? '#f6ad55'
                : resultados.densidadEnergetica <= 140
                ? '#38a169'
                : '#e53e3e',
          }}
        ></div>
      </div>
    </div>
     <div className={styles.rangeSection}>
      <div className={styles.rightColumnContent}> {/* New container */}
        <div className={styles.valueAndUnit}>
          <p className={styles.resultadoValue}>
            {resultados.densidadEnergetica} kcal/kg/día
          </p>
        </div>
        <div
          className={styles.rangeBox}
          style={{
            backgroundColor:
              resultados.densidadEnergetica < 115 ||
              resultados.densidadEnergetica > 140
                ? '#e53e3e'
                : '#38a169',
          }}
        >
          <p className={styles.rangeText}>
            {obtenerPorcentajeObjetivo('energia', resultados)}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
            {/* Resultado Final (Panel de Resumen) */}
            <div className={`${styles.resultadoFinal} ${resultados.esOptimo ? styles.optimo : styles.suboptimo}`}>
              <div className={styles.resultadoFinalContent}>
                <h4 className={styles.resultadoFinalTitle}>Fortificación Calculada</h4>
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

        {ui.mostrarResultados && (
              <button 
                className={styles.btnReset}
                onClick={handleReset}
              >
                Nuevo Cálculo
              </button>
            )}  
        
      </div> 
    </div>
  );
}

export default ResultadosCalculados;
