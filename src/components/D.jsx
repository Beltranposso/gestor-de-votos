import React, { useState } from 'react';
import { Download } from 'lucide-react';
import axios from 'axios';

const DownloadTemplate = () => {
  const fileUrl = '/plantilla.xlsx';
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDownload = () => {
  ;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Plantilla.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Activar la animación
    setIsAnimating(true);

    // Desactivar la animación después de 1 segundo
    setTimeout(() => setIsAnimating(false), 1000);
  };





  const downloadTemplate = async () => {
    try {
      const response = await axios.get('https://serverapivote.co.control360.co/download-template', {
        responseType: 'blob', // Esto asegura que la respuesta sea tratada como un archivo
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data])); // Convierte la respuesta a URL Blob
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'plantilla.xlsx'); // Nombre del archivo al descargar
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Libera la memoria
    } catch (error) {
      console.error('Error al descargar la plantilla:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={downloadTemplate}
        className={`group p-2 bg-teal-600 text-white rounded-md 
          hover:bg-teal-700 transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
          ${isAnimating ? 'animate-bounce' : ''}`}
        aria-label="Descargar Plantilla"
      >
        <Download 
          size={20} 
          className={`transform transition-transform duration-300 
            group-hover:translate-y-0.5 group-hover:scale-110
            ${isAnimating ? 'animate-pulse' : ''}`}
        />
      </button>
      <span className="text-gray-700 font-medium relative">
        <span className={`inline-block transition-all duration-300
          ${isAnimating ? 'transform translate-y-0.5 text-teal-600' : ''}`}>
          Descargar Plantilla
        </span>
      </span>
    </div>
  );
};

export default DownloadTemplate;
