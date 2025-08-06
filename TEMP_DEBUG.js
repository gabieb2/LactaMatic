  // Función para calcular la fortificación
  const calcularFortificacion = () => {
    updateState('ui.calculando', true);
    
    try {
      console.log('=== DEBUG CÁLCULO ===');
      console.log('Estado actual:', state);
      
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
        
        console.log('Composición base:', composicionBase);
        console.log('Días puerperio:', diasPuerperio);
        console.log('Composición ajustada:', composicionLeche);
      }
      
      // 2. Calcular requerimientos diarios
      const pesoKg = parseFloat(state.paciente.peso) || 0;
      const targetProteina = parseFloat(state.paciente.targetProteina) || 4.0;
      const volumenLecheDiario = (parseFloat(state.paciente.volumenLeche) || 150) * pesoKg;
      
      console.log('Peso:', pesoKg, 'kg');
      console.log('Target proteína:', targetProteina, 'g/kg/día');
      console.log('Volumen leche diario:', volumenLecheDiario, 'ml/día');
      
      // Validar datos mínimos
      if (pesoKg <= 0 || volumenLecheDiario <= 0) {
        throw new Error('Peso y volumen de leche deben ser mayores a 0');
      }
      
      const requerimientoProteinas = pesoKg * targetProteina; // g/día
      console.log('Requerimiento proteínas:', requerimientoProteinas, 'g/día');
      
      // 3. Calcular aporte de leche sola
      const aporteLeche = {
        proteinas: (composicionLeche.proteina * volumenLecheDiario) / 100,
        lactosa: (composicionLeche.lactosa * volumenLecheDiario) / 100,
        lipidos: (composicionLeche.lipidos * volumenLecheDiario) / 100
      };
      console.log('Aporte leche sola:', aporteLeche);
      
      // 4. Calcular déficit nutricional
      const deficitProteinas = Math.max(0, requerimientoProteinas - aporteLeche.proteinas);
      console.log('Déficit proteínas:', deficitProteinas, 'g/día');
      
      // 5. Calcular cantidad de fortificador necesaria
      const gramosLiofNecesarios = deficitProteinas > 0 ? 
        (deficitProteinas * 100) / state.fortificador.composicion.proteinaLiof : 0;
      const volumenFortificador = gramosLiofNecesarios / DEFAULT_VALUES.DENSIDAD_LIOFILIZADO;
      
      console.log('Gramos liofilizado necesarios:', gramosLiofNecesarios, 'g');
      console.log('Volumen fortificador:', volumenFortificador, 'ml');
      
      // 6. Calcular aportes del fortificador
      const aporteFortificador = {
        proteinas: (gramosLiofNecesarios * state.fortificador.composicion.proteinaLiof) / 100,
        lactosa: (gramosLiofNecesarios * state.fortificador.composicion.lactosaLiof) / 100,
        lipidos: (gramosLiofNecesarios * state.fortificador.composicion.lipidosLiof) / 100
      };
      console.log('Aporte fortificador:', aporteFortificador);
      
      // 7. Calcular totales finales
      const aporteTotal = {
        proteinas: aporteLeche.proteinas + aporteFortificador.proteinas,
        lactosa: aporteLeche.lactosa + aporteFortificador.lactosa,
        lipidos: aporteLeche.lipidos + aporteFortificador.lipidos
      };
      console.log('Aporte total:', aporteTotal);
      
      // 8. Calcular métricas finales
      // CORRIGIENDO EL CÁLCULO DE CONCENTRACIÓN
      const concentracionFortificador = volumenLecheDiario > 0 ? 
        (gramosLiofNecesarios * 100) / volumenLecheDiario : 0; // g/100ml de leche
      
      console.log('Concentración fortificador:', concentracionFortificador, 'g/100ml');
      
      const densidadEnergetica = calcularEnergia(aporteTotal, pesoKg);
      const optimizacionAlcanzada = requerimientoProteinas > 0 ? 
        Math.min(100, (aporteTotal.proteinas / requerimientoProteinas) * 100) : 0;
      
      console.log('Densidad energética:', densidadEnergetica, 'kcal/kg/día');
      console.log('Optimización alcanzada:', optimizacionAlcanzada, '%');
      
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
          composicionUsada: composicionLeche,
          // Datos adicionales para debugging
          debugInfo: {
            deficitProteinas: Math.round(deficitProteinas * 100) / 100,
            gramosLiofNecesarios: Math.round(gramosLiofNecesarios * 100) / 100,
            volumenLecheDiario: Math.round(volumenLecheDiario * 100) / 100
          }
        }
      });
      
      console.log('=== FIN DEBUG ===');
      
      updateState('ui.mostrarResultados', true);
      updateState('ui.errores', {});
      
    } catch (error) {
      console.error('Error en cálculo:', error);
      updateState('ui.errores.calculo', error.message || 'Error en el cálculo. Verifique los datos ingresados.');
    } finally {
      updateState('ui.calculando', false);
    }
  };