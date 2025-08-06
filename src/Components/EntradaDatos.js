import React from 'react';
import styles from './EntradaDatos.module.css';
import { useLactaTech } from '../context/LactaTechContext';

function EntradaDatos() {
  const { state, updateState } = useLactaTech();

  const handleLecheMetodoChange = (metodo) => {
    updateState('lecheMetodo', metodo);
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
    <div className={styles.entradaDatos}>
      {/* Sección 1: Leche Fluida */}
      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>1.1 Leche Fluida</h3>
        <p className={styles.inputSubtitle}>Método de determinación:</p>
        
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="lecheMetodo"
              value="manual"
              checked={state.lecheMetodo === 'manual'}
              onChange={() => handleLecheMetodoChange('manual')}
            />
            <span className={styles.radioLabel}>Manual (g/100ml)</span>
          </label>
          
          <label className={styles.radioOption}>
            <input
              type="radio"
              name="lecheMetodo"
              value="estimado"
              checked={state.lecheMetodo === 'estimado'}
              onChange={() => handleLecheMetodoChange('estimado')}
            />
            <span className={styles.radioLabel}>Estimado (Término/Pretérmino)</span>
          </label>
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
                placeholder="0.00"
              />
              <span>g/100ml</span>
            </div>
            <div className={styles.inputRow}>
              <label>Lactosa:</label>
              <input
                type="number"
                step="0.01"
                value={state.lecheManual.lactosa}
                onChange={(e) => handleLecheManualChange('lactosa', e.target.value)}
                placeholder="0.00"
              />
              <span>g/100ml</span>
            </div>
            <div className={styles.inputRow}>
              <label>Lípidos:</label>
              <input
                type="number"
                step="0.01"
                value={state.lecheManual.lipidos}
                onChange={(e) => handleLecheManualChange('lipidos', e.target.value)}
                placeholder="0.00"
              />
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
                placeholder="0"
              />
              <span>días</span>
            </div>
          </div>
        )}
      </div>

      {/* Sección 2: Fortificador */}
      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>1.2 Fortificador</h3>
        <p className={styles.inputSubtitle}>46.2g Prot, 51.8g Lact, 25.2g Líp/100g</p>
        
        <div className={styles.fortificadorSelector}>
          <select className={styles.fortificadorDropdown}>
            <option value="comercial">Comercial Fort. (Estándar)</option>
            <option value="personalizado">Personalizado</option>
          </select>
        </div>
      </div>

      {/* Sección 3: Parámetros del Paciente */}
      <div className={styles.inputSection}>
        <h3 className={styles.inputTitle}>1.3 Parámetros del Paciente</h3>
        
        <div className={styles.inputRow}>
          <label>Peso:</label>
          <input
            type="number"
            step="0.1"
            value={state.paciente.peso}
            onChange={(e) => handlePacienteChange('peso', e.target.value)}
            placeholder="1.5"
          />
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
            onChange={(e) => handlePacienteChange('targetProteina', e.target.value)}
          />
          <span>g/kg/día</span>
          <small>(3.5-4.5)</small>
        </div>
        
        <div className={styles.inputRow}>
          <label>Vol. leche:</label>
          <input
            type="number"
            value={state.paciente.volumenLeche}
            onChange={(e) => handlePacienteChange('volumenLeche', e.target.value)}
          />
          <span>ml/kg/día</span>
        </div>
      </div>
    </div>
  );
}

export default EntradaDatos;
