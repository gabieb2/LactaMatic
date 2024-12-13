import React from 'react';
import styles from './BotonContainer.css';
import { useValoresNutricionales } from '../context/ValoresNutricionalesContext'; // Usa el hook
import { calcularFortificacion } from '../helpers/cuentaAuxiliar';

function BotonContainer() {
  const { valoresNutricionales } = useValoresNutricionales();

  const handleCalculate = () => {
    // Llamamos a la función con el conjunto adecuado
    const total = calcularFortificacion(valoresNutricionales);
    
    // Accede a las propiedades correctas para mostrar el valor
    alert(`
      Mililtros de leche: ${total.lechetotal}
      Mililtros de fortificador: ${total.fortificacion}
      `);
  };

  return (
    <div className="buttonFort">
      <h3>Fortificación basada en proteina para prematuros:</h3>
      {/*<p>Proteínas: {valoresNutricionales.primerConjunto.proteinas} g</p>
      <p>Lípidos: {valoresNutricionales.primerConjunto.lipidos} g</p>
      <p>Lactosa: {valoresNutricionales.primerConjunto.lactosa} g</p>

      <h3>Valores Fortificador Recibidos:</h3>

      <p>Proteínas: {valoresNutricionales.segundoConjunto.proteinas} g</p>
      <p>Lípidos: {valoresNutricionales.segundoConjunto.lipidos} g</p>
      <p>Lactosa: {valoresNutricionales.segundoConjunto.lactosa} g</p> */}

      <button onClick={() => handleCalculate()}>
        Calcular fortificación
      </button>
    </div>
  );
}

export default BotonContainer;
