import React from 'react';
import styles from './centercontainer.css';  // Si tienes un archivo CSS externo, o puedes aplicar estilos en línea

function CenterContainer() {
  return (
    <div className={styles.CenterContainer}>
      <h>Fortificación basada en recomendación ESPAGH de 3,5gr/150ml por Kg de peso
      <br /> Coloque el peso del niño:
      <br />Seleccione si fue termino a pretermino
      <br /> Indique la fecha de nacimiento/días de vida
      </h>
      
    </div>
  );
}

export default CenterContainer;
