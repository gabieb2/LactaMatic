import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const ValoresNutricionalesContext = createContext();

// Proveedor de contexto
export const ValoresNutricionalesProvider = ({ children }) => {
  // Estado con dos conjuntos de valores nutricionales
  const [valoresNutricionales, setValoresNutricionales] = useState({
    primerConjunto: {
      proteinas: '',
      lipidos: '',
      lactosa: '',
    },
    segundoConjunto: {
      proteinas: '',
      lipidos: '',
      lactosa: '',
    },
  });

  // Función para actualizar cualquier conjunto de valores nutricionales
  const updateValores = (conjunto, newValues) => {
    setValoresNutricionales((prev) => ({
      ...prev,
      [conjunto]: {
        ...prev[conjunto],
        ...newValues,
      },
    }));
  };

  return (
    <ValoresNutricionalesContext.Provider value={{ valoresNutricionales, updateValores }}>
      {children}
    </ValoresNutricionalesContext.Provider>
  );
};

// Hook para usar el contexto en los componentes
export const useValoresNutricionales = () => useContext(ValoresNutricionalesContext);
