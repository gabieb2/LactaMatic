// Función que realiza alguna operación con los valores nutricionales
import React, { useState } from 'react';
import DatosNutricionales from '../Components/DatosNutricionales.js';


var P1 =1 //peso en kg
var P4 = 3.5; //masa deseada en 150ml
var N4 = 150; //volumen deseado por kg


// src/helpers/cuentaAuxiliar.js
export const calcularFortificacion = (valoresNutricionales) => {
  const { proteinas: proteinas1, lipidos: lipidos1, lactosa: lactosa1 } = valoresNutricionales.primerConjunto;
  const { proteinas: proteinas2, lipidos: lipidos2, lactosa: lactosa2 } = valoresNutricionales.segundoConjunto;
  
  // Realizamos el cálculo sumando los valores de ambos conjuntos
  const totalProteinas = (parseFloat(proteinas1) || 0) + (parseFloat(proteinas2) || 0);
  const totalLipidos = (parseFloat(lipidos1) || 0) + (parseFloat(lipidos2) || 0);
  const totalLactosa = (parseFloat(lactosa1) || 0) + (parseFloat(lactosa2) || 0);

  // Definir las variables directamente con los valores correspondientes
  var E1 = proteinas2; // concentración en el fortificador
  var B1 = proteinas1; // concentración en la leche

 var resultado = ((P4 * 100) - ((N4*P1) * E1)) / ((B1 - E1));
 var fortificación = N4-resultado;
 //console.log(resultado)

  // Devolver el resultado
  return {
    totalProteinas,
    totalLipidos,
    totalLactosa,
    lechetotal: resultado,
    fortificacion: fortificación, // Cambié la propiedad para que esté bien definida
  };
};


 /* React.useEffect(() => {
    if (valoresNutricionales.proteinas) { // Check if the values exist
      calcularFortificacion(valoresNutricionales);
    }
  }, [valoresNutricionales]);  // Recalculate when valoresNutricionales changes */
  