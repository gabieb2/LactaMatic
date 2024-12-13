import React, { useState } from 'react';
import './RightAlignedComponent.css'; // Asegúrate de que el CSS esté importado
import { useValoresNutricionales } from '../context/ValoresNutricionalesContext';



function RightAlignedComponent() {
  const { valoresNutricionales, updateValores } = useValoresNutricionales();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateValores('segundoConjunto', { [name]: value }); // Actualiza el segundo conjunto de valores
  };


  return (
        
        <div className="parentizquierda">
          <div className="container">
          <h2>Datos del fortificador</h2>
          
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
          <p>Proteínas: {valoresNutricionales.segundoConjunto.proteinas} g</p>
          <p>Lípidos: {valoresNutricionales.segundoConjunto.lipidos} g</p>
          <p>Lactosa: {valoresNutricionales.segundoConjunto.h3lactosa} g</p>
          
          </div>
          </div>
      );
}

export default RightAlignedComponent;
