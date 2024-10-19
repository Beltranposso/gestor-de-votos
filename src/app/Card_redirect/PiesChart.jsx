import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App({options, value}) {
  const data = {
    labels:options, // Usando opcion1 en las etiquetas
    datasets: [
      {
        label: 'Cantidad de votos',
        data: value,
        backgroundColor: [
          'rgba(93, 206, 255)',
          'rgba(105, 255, 93)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
