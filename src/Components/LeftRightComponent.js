import React, { useState } from 'react';

import styles from './LeftRightComponent.css';


import DatosNutricionales from './DatosNutricionales';
import RightAlignedComponent from './RightAlignedComponent.js';

function LeftRightComponent() {

  const [valoresNutricionales, setValoresNutricionales] = useState({
    proteinas: '',
    lipidos: '',
    lactosa: '',
  });

return (
    <div className="parent">
      <div className="left-container">
        <DatosNutricionales setValoresNutricionales={setValoresNutricionales} />
      </div>
      <div className="right-container">
        <RightAlignedComponent/>
      </div>
    </div>


  );
}

export default LeftRightComponent;
