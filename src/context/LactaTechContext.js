import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto principal de Chechomatic
const LactaTechContext = createContext();

// Valores por defecto basados en nuestro análisis del Excel
const DEFAULT_VALUES = {
  // Composiciones promedio de leche humana
  LECHE_PROMEDIO: {
    term: { proteina: 1.04, lactosa: 7.19, lipidos: 2.96 },
    preterm: { proteina: 1.72, lactosa: 5.58, lipidos: 3.04 }
  },

  // Fortificador comercial estándar
  FORTIFICADOR_COMERCIAL: {
    nombre: 'Comercial Fort.',
    proteinaLiof: 46.2,  // g/100g liofilizado
    lactosaLiof: 51.8,   // g/100g liofilizado  
    lipidosLiof: 25.2    // g/100g liofilizado
  },

  // Rangos objetivo nutricionales
  RANGOS_OBJETIVO: {
    proteinas: { min: 3.5, max: 4.5 }, // g/kg/día
    lactosa: { min: 11, max: 15 },     // g/kg/día  
    lipidos: { min: 4.8, max: 8.1 },  // g/kg/día
    energia: { min: 115, max: 140 }    // kcal/kg/día
  },

  // Constantes físicas
  DENSIDAD_LIOFILIZADO: 1.4,  // g/ml
  VOLUMEN_LECHE_ESTANDAR: 150  // ml/kg/día
};

// Proveedor de contexto
export const LactaTechProvider = ({ children }) => {
  // Estado principal de la aplicación
  const [state, setState] = useState({
    // Datos de entrada - Leche Fluida
    lecheMetodo: 'manual', // 'manual' | 'estimado'
    lecheManual: {
      proteina: '',
      lactosa: '',
      lipidos: ''
    },
    lecheEstimado: {
      tipoLeche: 'preterm', // 'term' | 'preterm'
      diasPuerperio: ''
    },

    // Datos de entrada - Fortificador
    fortificador: {
      tipo: 'comercial', // 'comercial' | 'personalizado'
      composicion: DEFAULT_VALUES.FORTIFICADOR_COMERCIAL
    },

    // Datos de entrada - Parámetros del paciente
    paciente: {
      peso: '',              // kg
      targetProteina: 4.0,   // g/kg/día
      volumenLeche: 150      // ml/kg/día
    },

    // Resultados calculados
    resultados: {
      aporteProteicoTotal: 0,
      concentracionFortificador: 0,
      densidadEnergetica: 0,
      volumenFortificador: 0,
      optimizacionAlcanzada: 0,
      esOptimo: false
    },

    // Estados de UI
    ui: {
      calculando: false,
      mostrarResultados: false,
      errores: {}
    }
  });

  // Función para actualizar cualquier parte del estado
  const updateState = (path, value) => {
    setState(prev => {
      const newState = { ...prev };

      // Navegar por el path y actualizar el valor
      const keys = path.split('.');
      let current = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return newState;
    });
  };

  // Función para calcular la fortificación
  const calcularFortificacion = () => {
    updateState('ui.calculando', true);

    try {
      // 1. Determinar composición de leche base
      let composicionLeche;
      if (state.lecheMetodo === 'manual') {
        composicionLeche = {
          proteina: parseFloat(state.lecheManual.proteina) || 0,
          lactosa: parseFloat(state.lecheManual.lactosa) || 0,
          lipidos: parseFloat(state.lecheManual.lipidos) || 0
        };
      } else {
        // Obtener composición base según tipo
        const composicionBase = DEFAULT_VALUES.LECHE_PROMEDIO[state.lecheEstimado.tipoLeche];

        // Ajustar por días de puerperio
        const diasPuerperio = parseInt(state.lecheEstimado.diasPuerperio) || 15;
        composicionLeche = ajustarPorDiasPuerperio(composicionBase, diasPuerperio);
      }

      // 2. Calcular requerimientos diarios
      const pesoKg = parseFloat(state.paciente.peso) || 0;
      const targetProteina = parseFloat(state.paciente.targetProteina) || 4.0;
      const volumenLecheDiario = (parseFloat(state.paciente.volumenLeche) || 150) * pesoKg;

      // Validar datos mínimos
      if (pesoKg <= 0 || volumenLecheDiario <= 0) {
        throw new Error('Peso y volumen de leche deben ser mayores a 0');
      }

      const requerimientoProteinas = pesoKg * targetProteina; // g/día

      // 3. Calcular aporte de leche sola
      const aporteLeche = {
        proteinas: (composicionLeche.proteina * volumenLecheDiario) / 100,
        lactosa: (composicionLeche.lactosa * volumenLecheDiario) / 100,
        lipidos: (composicionLeche.lipidos * volumenLecheDiario) / 100
      };

      // 4. Calcular déficit nutricional
      const deficitProteinas = Math.max(0, requerimientoProteinas - aporteLeche.proteinas);

      // 5. Calcular cantidad de fortificador necesaria
      const gramosLiofNecesarios = deficitProteinas > 0 ?
        (deficitProteinas * 100) / state.fortificador.composicion.proteinaLiof : 0;
      const volumenFortificador = gramosLiofNecesarios / DEFAULT_VALUES.DENSIDAD_LIOFILIZADO;

      // 6. Calcular aportes del fortificador
      const aporteFortificador = {
        proteinas: (gramosLiofNecesarios * state.fortificador.composicion.proteinaLiof) / 100,
        lactosa: (gramosLiofNecesarios * state.fortificador.composicion.lactosaLiof) / 100,
        lipidos: (gramosLiofNecesarios * state.fortificador.composicion.lipidosLiof) / 100
      };

      // 7. Calcular totales finales
      const aporteTotal = {
        proteinas: aporteLeche.proteinas + aporteFortificador.proteinas,
        lactosa: aporteLeche.lactosa + aporteFortificador.lactosa,
        lipidos: aporteLeche.lipidos + aporteFortificador.lipidos
      };

      // 8. Calcular métricas finales
      // CORREGIDO: Cálculo de concentración en g/100ml de leche
      const concentracionFortificador = volumenLecheDiario > 0 ?
        (gramosLiofNecesarios * 100) / volumenLecheDiario : 0; // g/100ml de leche
      const densidadEnergetica = calcularEnergia(aporteTotal, pesoKg);
      const optimizacionAlcanzada = requerimientoProteinas > 0 ?
        Math.min(100, (aporteTotal.proteinas / requerimientoProteinas) * 100) : 0;

      // 9. Verificar rangos de seguridad
      const esSeguro = verificarSeguridadFortificacion(concentracionFortificador, densidadEnergetica, pesoKg);

      // Actualizar resultados
      updateState('resultados', {
        aporteProteicoTotal: Math.round(aporteTotal.proteinas * 100) / 100,
        concentracionFortificador: Math.round(concentracionFortificador * 100) / 100,
        densidadEnergetica: Math.round(densidadEnergetica),
        volumenFortificador: Math.round(volumenFortificador * 100) / 100,
        optimizacionAlcanzada: Math.round(optimizacionAlcanzada),
        esOptimo: optimizacionAlcanzada >= 80 && optimizacionAlcanzada <= 110 && esSeguro,
        // Datos adicionales para debug
        detalles: {
          requerimientoProteinas: Math.round(requerimientoProteinas * 100) / 100,
          aporteLeche: Math.round(aporteLeche.proteinas * 100) / 100,
          aporteFortificador: Math.round(aporteFortificador.proteinas * 100) / 100,
          composicionUsada: composicionLeche
        }
      });

      updateState('ui.mostrarResultados', true);
      updateState('ui.errores', {});

    } catch (error) {
      console.error('Error en cálculo:', error);
      updateState('ui.errores.calculo', error.message || 'Error en el cálculo. Verifique los datos ingresados.');
    } finally {
      updateState('ui.calculando', false);
    }
  };

  // Función auxiliar para ajustar composición por días de puerperio
  const ajustarPorDiasPuerperio = (composicionBase, diasPuerperio) => {
    // Fórmulas basadas en literatura científica
    let factorProteina = 1;
    let factorLactosa = 1;
    let factorLipidos = 1;

    if (diasPuerperio <= 5) {
      // Calostro: más proteína, menos lactosa
      factorProteina = 1.8;  // +80% proteína
      factorLactosa = 0.6;   // -40% lactosa
      factorLipidos = 0.8;   // -20% lípidos
    } else if (diasPuerperio <= 14) {
      // Leche de transición: gradual
      const progreso = (diasPuerperio - 5) / 9; // 0 a 1
      factorProteina = 1.8 - (0.8 * progreso);  // 1.8 → 1.0
      factorLactosa = 0.6 + (0.4 * progreso);   // 0.6 → 1.0
      factorLipidos = 0.8 + (0.2 * progreso);   // 0.8 → 1.0
    }
    // Después de 14 días: factores = 1 (composición madura)

    return {
      proteina: Math.round((composicionBase.proteina * factorProteina) * 100) / 100,
      lactosa: Math.round((composicionBase.lactosa * factorLactosa) * 100) / 100,
      lipidos: Math.round((composicionBase.lipidos * factorLipidos) * 100) / 100
    };
  };

  // Función auxiliar para calcular energía más precisa
  const calcularEnergia = (aporteTotal, peso) => {
    // Fórmula: 4 kcal/g proteína + 4 kcal/g lactosa + 9 kcal/g lípidos
    const energiaTotal =
      (aporteTotal.proteinas * 4) +
      (aporteTotal.lactosa * 4) +
      (aporteTotal.lipidos * 9);

    // Retornar kcal/kg/día
    return peso > 0 ? energiaTotal / peso : 0;
  };

  // Función para verificar seguridad de la fortificación
  const verificarSeguridadFortificacion = (concentracionFort, densidadEnergetica, peso) => {
    // Límites de seguridad
    const limites = {
      concentracionMaxima: 5.0,     // % máximo de fortificador en volumen
      densidadEnergeticaMin: 100,   // kcal/kg/día mínimo
      densidadEnergeticaMax: 150,   // kcal/kg/día máximo
      pesoMinimo: 0.5               // kg mínimo
    };

    return (
      concentracionFort <= limites.concentracionMaxima &&
      densidadEnergetica >= limites.densidadEnergeticaMin &&
      densidadEnergetica <= limites.densidadEnergeticaMax &&
      peso >= limites.pesoMinimo
    );
  };

  // Función para resetear la aplicación
  const resetear = () => {
    setState(prev => ({
      ...prev,
      lecheManual: { proteina: '', lactosa: '', lipidos: '' },
      lecheEstimado: { tipoLeche: 'preterm', diasPuerperio: '' },
      paciente: { peso: '', targetProteina: 4.0, volumenLeche: 150 },
      resultados: {
        aporteProteicoTotal: 0,
        concentracionFortificador: 0,
        densidadEnergetica: 0,
        volumenFortificador: 0,
        optimizacionAlcanzada: 0,
        esOptimo: false
      },
      ui: { calculando: false, mostrarResultados: false, errores: {} }
    }));
  };

  return (
    <LactaTechContext.Provider value={{
      state,
      updateState,
      calcularFortificacion,
      resetear,
      DEFAULT_VALUES
    }}>
      {children}
    </LactaTechContext.Provider>
  );
};

// Hook para usar el contexto en los componentes
export const useLactaTech = () => {
  const context = useContext(LactaTechContext);
  if (!context) {
    throw new Error('useLactaTech debe usarse dentro de LactaTechProvider');
  }
  return context;
};
