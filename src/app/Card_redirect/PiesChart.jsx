import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App({ options, value, onDataReady }) {
  const defaultColors = [
    'rgba(255, 59, 59 )',
    'rgba(255, 247, 0 )',
    'rgba(103, 255, 63)',
    'rgba(0, 182, 255 )',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
  ];

  const colors = options.map((_, index) => defaultColors[index % defaultColors.length]);
  const total = value.reduce((sum, val) => sum + val, 0);

  // Calcular datos con porcentaje y color
  const dataWithPercentages = options.map((label, index) => {
    const percentage = ((value[index] / total) * 100).toFixed(2);
    return { label, percentage, color: colors[index] };
  });

  // Preparar datos para la gráfica
  const data = {
    labels: options,
    datasets: [
      {
        label: 'Cantidad de votos',
        data: value,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const percentage = dataWithPercentages[context.dataIndex].percentage;
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  // Enviar datos al padre automáticamente al montar el componente
  useEffect(() => {
    if (onDataReady) {
      onDataReady(dataWithPercentages); // Enviar los datos al componente padre
    }
  }, []);

  return <Pie data={data} options={chartOptions} />;
}
