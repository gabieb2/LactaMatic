import React from 'react';
import './App.css';
import { LactaTechProvider } from './context/LactaTechContext';
import Header from './Components/header';
import CalculadoraFortificacion from './Components/CalculadoraFortificacion';

function App() {
  return (
    <LactaTechProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <CalculadoraFortificacion />
        </main>
      </div>
    </LactaTechProvider>
  );
}

export default App;
