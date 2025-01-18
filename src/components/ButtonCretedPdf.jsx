import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { URI26 } from "../services/Conexiones";
import { Loader2 } from "lucide-react";

export default function AnimatedStartButton({ estado, label, className = "", id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const generatePdf = ({ usuarios, quorumsTotales }) => {

    try {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Informe de Asamblea", 10, 10);

      let startY = 20;

      // Agregar fila inicial con quorumsTotales
      autoTable(doc, {
        startY,
        head: [["Quorum Total"]],
        body: [[quorumsTotales]],
      });
     

      startY += 20; // Ajustar posición para la siguiente tabla

      // Verificar si usuarios contiene datos válidos
      if (Array.isArray(usuarios) && usuarios.length > 0) {
        const headers = ["Nombre y apellido", "Cedula", "Asistencia", "Coeficiente","Representante" ,"Hora de llegada"];
        const rows = usuarios.map((usuario) => [
          usuario.NombreCompleto,
          usuario.Cedula,
          usuario.Asistencia,
          usuario.quorum,
          usuario.Representante,
          usuario.HoraDellegada,
        ]);

        // Generar tabla de usuarios
        autoTable(doc, {
          startY,
          head: [headers],
          body: rows,
        });
   
      } else {
      
        doc.text("No se encontraron usuarios", 10, startY + 10);
      }

      // Guardar el PDF
      doc.save(`informe-${id}.pdf`);
  
    } catch (error) {
      console.error("Error detallado al generar el PDF:", error);
    }
  };

  const handleClick = async () => {
   
    setIsLoading(true);

    try {
      const response = await axios.get(`${URI26}${id}`);
  

      const { usuarios, quorumsTotales } = response.data;

      if (!usuarios || !quorumsTotales) {
        throw new Error("Datos incompletos.");
      }

      setData(response.data);

      // Generar el PDF
      setTimeout(() => generatePdf(response.data), 100);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Ocurrió un error al obtener los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={estado === "Activa" || estado === "Programada"}
      variant="ghost"
      className={`w-full ${className} flex justify-start hover:bg-red-100`}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
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
        className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
        <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
        <path d="M17 18h2" />
        <path d="M20 15h-3v6" />
        <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
      </svg>
      {"Lista de asistencia PDF"}
    </Button>
  );
}
