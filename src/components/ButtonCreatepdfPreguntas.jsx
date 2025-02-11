import React, { useState,useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { URI30 } from '../services/Conexiones';
import { use } from 'react';
import axios from 'axios';
const PDFGeneratorButton = ({ className = "",id,estado }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  // Data de ejemplo
 


const getresultados = async () => {

try {
  const response = await axios.get(URI30+id);
  setData(response.data);

} catch (error) {
  console.error("Error al obtener la asamblea:", error);
}
}

useEffect(() => {
  getresultados();
}, []);
  const generateVotingResultsPDF = async () => {
    setIsLoading(true);
    try {
      const doc = new jsPDF();

      // Información general
   
 
      doc.text("Resultado de votaciones:" , 10, 10);
      data.resultados.forEach((resultado, index) => {
        // Agregar el título de la pregunta
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${resultado.pregunta}`, 10, 15 + (index * 60));
    
        // Preparar los headers de la tabla
        const headers = [
          ['Opciones', '%']
        ];
     
        // Preparar las filas de datos
        const rows = resultado.opciones.map((opcion, idx) => [
          `${idx + 1}- ${opcion.opcion}`,
          `${opcion.porcentaje}%`
        ]);
    
        // Agregar fila del total
        rows.push(['Total', '100.00%']);
    
        // Configurar y generar la tabla
        autoTable(doc, {
          head: headers,
          body: rows,
          startY: 20 + (index * 60),
          theme: 'grid',
          styles: {
            fontSize: 10,
            cellPadding: 3,
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 30, halign: 'right' }
          },
          headStyles: {
            fillColor: [173, 255, 47], // Verde pastel
            textColor: [0, 0, 0] // Cambiar a negro para mejor visibilidad en un fondo claro
          },
          footStyles: {
            fillColor: [52, 58, 64],
            textColor: [255, 255, 255]
          },
          didParseCell: function(data) {
            if (data.row.index === rows.length - 1) {
              data.cell.styles.fillColor = [52, 58, 64];
              data.cell.styles.textColor = [255, 255, 255];
            }
          }
        });
      });
    
      // Guardar el PDF
      doc.save('resultados-votacion.pdf');
    } catch (error) {
      console.error('Error generando PDF:', error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <Button
      onClick={generateVotingResultsPDF}
      disabled={estado === "Activa" || estado === "Programada"}
      variant="ghost"
      className={`w-full flex justify-start hover:bg-red-100 ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={12}
          height={12}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
          <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
          <path d="M17 18h2" />
          <path d="M20 15h-3v6" />
          <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
        </svg>
      )}
      Reporte de votaciones
    </Button>
  );
};

export default PDFGeneratorButton;