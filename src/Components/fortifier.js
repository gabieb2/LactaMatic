import { useData } from "../context/DataContext";

const Fortificador = () => {
  const { fortificador } = useData();

  if (!fortificador || fortificador.length === 0) return <p>Cargando datos...</p>;

  // Ignoramos la fila de cabecera de Google Sheets si queremos usar la propia
  const dataRows = fortificador.slice(1);

  return (
    <div>
      <h2>Macronutrientes</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Protein (g/100g)</th>
            <th>Lactose (g/100)</th>
            <th>Fat (g/100)</th>
          </tr>
        </thead>
        <tbody>
          {dataRows.map((fila, i) => (
            <tr key={i}>
              <td>{fila[0]}</td>
              <td>{fila[1]}</td>
              <td>{fila[2]}</td>
              <td>{fila[3]}</td>
              <td>{fila[4]}</td>
            </tr>
          ))}
        </tbody>  
      </table>
    </div>
  );
};

export default Fortificador;
import React from 'react';