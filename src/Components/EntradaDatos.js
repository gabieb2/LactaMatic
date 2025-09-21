import React from 'react';
import styles from './EntradaDatos.module.css';
import { useLactaTech } from '../context/LactaTechContext';

function EntradaDatos() {
  const { state, updateState } = useLactaTech();

  const handleLecheMetodoChange = (metodo) => {
    updateState('lecheMetodo', metodo);
  };

  const handleFortificacionMetodoChange = (metodo) => {
    updateState('fortificacionMetodo', metodo);
  };

  const handleLecheManualChange = (campo, valor) => {
    updateState(`lecheManual.${campo}`, valor);
  };

  const handleLecheEstimadoChange = (campo, valor) => {
    updateState(`lecheEstimado.${campo}`, valor);
  };

  const handlePacienteChange = (campo, valor) => {
    updateState(`paciente.${campo}`, valor);
  };

  return (
    <><div className={styles.entradaDatos}>
      {/* Sección 1: Leche Fluida */}
      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>Leche Fluida</h3>
        <p className={styles.inputSubtitle}>Método de determinación:</p>

        {/* INICIO DE LA MODIFICACIÓN */}
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.toggleButton} ${state.lecheMetodo === 'manual' ? styles.active : ''}`}
            onClick={() => handleLecheMetodoChange('manual')}
          >Composición conocida (Miris/Test)
          </button>

          <button
            className={`${styles.toggleButton} ${state.lecheMetodo === 'estimado' ? styles.active : ''}`}
            onClick={() => handleLecheMetodoChange('estimado')}
          >Estimado por días de puerperio
          </button>
        </div>

        {/* Campos condicionales */}
        {state.lecheMetodo === 'manual' ? (
          <div className={styles.camposDinamicos}>
            <div className={styles.inputRow}>
              <label>Proteína:</label>
              <input
                type="number"
                step="0.01"
                value={state.lecheManual.proteina}
                onChange={(e) => handleLecheManualChange('proteina', e.target.value)}
                placeholder="0.00" />
              <span>g/100ml</span>
            </div>
            <div className={styles.inputRow}>
              <label>Lactosa:</label>
              <input
                type="number"
                step="0.01"
                value={state.lecheManual.lactosa}
                onChange={(e) => handleLecheManualChange('lactosa', e.target.value)}
                placeholder="0.00" />
              <span>g/100ml</span>
            </div>
            <div className={styles.inputRow}>
              <label>Lípidos:</label>
              <input
                type="number"
                step="0.01"
                value={state.lecheManual.lipidos}
                onChange={(e) => handleLecheManualChange('lipidos', e.target.value)}
                placeholder="0.00" />
              <span>g/100ml</span>
            </div>
          </div>
        ) : (
          <div className={styles.camposDinamicos}>
            <div className={styles.inputRow}>
              <label>Tipo:</label>
              <select
                value={state.lecheEstimado.tipoLeche}
                onChange={(e) => handleLecheEstimadoChange('tipoLeche', e.target.value)}
              >
                <option value="preterm">Pretérmino</option>
                <option value="term">A término</option>
              </select>
            </div>
            <div className={styles.inputRow}>
              <label>Días puerperio:</label>
              <input
                type="number"
                value={state.lecheEstimado.diasPuerperio}
                onChange={(e) => handleLecheEstimadoChange('diasPuerperio', e.target.value)}
                placeholder="0" />
              <span>días</span>
            </div>
          </div>
        )}
      </div>

      {/* Sección 2: Fortificador */}
      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>Fortificador</h3>
        <p className={styles.inputSubtitle}>Proteina, Lactosa y Lípidos</p>

        <div className={styles.fortificadorSelector}>
          <select className={styles.fortificadorDropdown}>
            <option value="Nutriprem">NutriPrem (BAGO) 33P-37La-18L (g/100g)</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </div>
      </div>

      {/* Sección 3: Parámetros del Paciente */}
      <div className={styles.inputSection}>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.toggleButton} ${state.fortificacionMetodo === 'standard' ? styles.active : ''}`}
          onClick={() => handleFortificacionMetodoChange('standard')}
        >Fortificación estándar 1g /25ml
        </button>

        <button
          className={`${styles.toggleButton} ${state.fortificacionMetodo === 'proteinAdjusted' ? styles.active : ''}`}
          onClick={() => handleFortificacionMetodoChange('proteinAdjusted')}
        >Ajustado para alcanzar target proteico
        </button>
      </div>

      {state.fortificacionMetodo === 'standard' ? (
        <div className={styles.camposDinamicos}>
           <h3 className={styles.inputTitle}>Parámetros del Paciente</h3>
        <div className={styles.inputRow}>
          <label>Peso:</label>
          <input
            type="number"
            step="0.1"
            value={state.paciente.peso}
            onChange={(e) => handlePacienteChange('peso', e.target.value)}
            placeholder="1.5" />
          <span>kg</span>
        </div>

               <div className={styles.inputRow}>
          <label>Vol. leche:</label>
          <input
            type="number"
            step="0.1"
            min="5"
            max="300"
            value={state.paciente.volumenLeche}
            onChange={(e) => handlePacienteChange('volumenLeche', e.target.value)} />
          <span>ml/kg/día</span>
        </div>       
       </div>
        
      ) : (
        <div className={styles.camposDinamicos}>
        <h3 className={styles.inputTitle}>Parámetros del Paciente</h3>
        <div className={styles.inputRow}>
          <label>Peso:</label>
          <input
            type="number"
            step="0.1"
            value={state.paciente.peso}
            onChange={(e) => handlePacienteChange('peso', e.target.value)}
            placeholder="1.5" />
          <span>kg</span>
        </div>

        <div className={styles.inputRow}>
          <label>Target prot.:</label>
          <input
            type="number"
            step="0.1"
            min="3.5"
            max="4.5"
            value={state.paciente.targetProteina}
            onChange={(e) => handlePacienteChange('targetProteina', e.target.value)} />
          <span>g/kg/día</span>
          <small>(3.5-4.5)</small>
        </div>

        <div className={styles.inputRow}>
          <label>Vol. leche:</label>
          <input
            type="number"
            step="0.1"
            min="5"
            max="300"
            value={state.paciente.volumenLeche}
            onChange={(e) => handlePacienteChange('volumenLeche', e.target.value)} />
          <span>ml/kg/día</span>
        </div>       
       </div>
      )}
      </div>

    </div></>
  );
}

export default EntradaDatos;
