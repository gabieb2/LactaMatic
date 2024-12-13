import logo from './logo.svg';
import './App.css';
import React from 'react';
//import styles from './LeftRightComponent.css'
import LeftRightComponent from './Components/LeftRightComponent'
import Header from './Components/header';
import  BotonContainer from './Components/BotonContainer'
import valoresNutricionales from './Components/DatosNutricionales'
import { ValoresNutricionalesProvider } from './context/ValoresNutricionalesContext'; // Importa el proveedor


function ButtonComponent() {
  // Función que se ejecuta al hacer clic en el botón
  const handleClick = () => {
    alert('¡Botón clicado!');
  };

  return (
    <button onClick={handleClick}>
      Haz clic aquí
    </button>
  );
}




function App() {
  return (
    <ValoresNutricionalesProvider>
      <div>
        <Header />
        <LeftRightComponent />
        <BotonContainer/>
      </div>
    </ValoresNutricionalesProvider>
  );
} 



export default App;
