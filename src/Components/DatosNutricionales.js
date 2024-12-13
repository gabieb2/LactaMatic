import React, { useState } from 'react';
import styles from './DatosNutricionales.module.css';
import { useValoresNutricionales } from '../context/ValoresNutricionalesContext';

function DatosNutricionales() {
  const { valoresNutricionales, updateValores } = useValoresNutricionales();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateValores('primerConjunto', { [name]: value }); // Actualiza el primer conjunto de valores
  };

  return (
    <div className="parentizquierda">
      <div className="container">
        <h2>Datos leche fluida</h2>

        <div>
          <label>Proteínas (g/100ml): </label>
          <input
            type="number"
            name="proteinas"
            value={valoresNutricionales.proteinas}
            onChange={handleChange}
            placeholder="Ingresa cantidad de proteínas"
          />
        </div>

        <div>
          <label>Lípidos (g/100ml): </label>
          <input
            type="number"
            name="lipidos"
            value={valoresNutricionales.lipidos}
            onChange={handleChange}
            placeholder="Ingresa cantidad de lípidos"
          />
        </div>

        <div>
          <label>Lactosa (g/100ml): </label>
          <input
            type="number"
            name="lactosa"
            value={valoresNutricionales.lactosa}
            onChange={handleChange}
            placeholder="Ingresa cantidad de lactosa"
          /> 
       </div>
        <h3>Valores ingresados:</h3>
          <p>Proteínas: {valoresNutricionales.primerConjunto.proteinas} g</p>
          <p>Lípidos: {valoresNutricionales.primerConjunto.lipidos} g</p>
          <p>Lactosa: {valoresNutricionales.primerConjunto.lactosa} g</p> 
       
      </div>
    </div>
  );
}

export default DatosNutricionales;
