import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App({ options, value }) {
  // Paleta de colores por defecto
  const defaultColors = [
    'rgba(93, 206, 255, 0.6)',   // Azul claro
    'rgba(105, 255, 93, 0.6)',   // Verde claro
    'rgba(255, 193, 7, 0.6)',    // Amarillo
    'rgba(255, 87, 51, 0.6)',    // Rojo
    'rgba(153, 102, 255, 0.6)',  // Púrpura
    'rgba(255, 159, 64, 0.6)',   // Naranja
  ];

  // Asignar colores cíclicamente a las opciones
  const colors = options.map((_, index) => defaultColors[index % defaultColors.length]);

  const data = {
    labels: options, // Usando opciones en las etiquetas
    datasets: [
      {
        label: 'Cantidad de votos',
        data: value,
        backgroundColor: colors, // Usar colores predefinidos
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
