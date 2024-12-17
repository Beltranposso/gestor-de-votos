import React, { useState } from 'react';
import { Download } from 'lucide-react';

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

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDownload}
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
