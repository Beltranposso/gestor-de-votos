import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';

export default function AnimatedStartButton({ onClick, estado }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (estado === "Activa") {
      setColor("bg-[#ffd219]"); // Color amarillo
    } else if (estado === "Programada") {
      setColor("bg-[#19d5ff]"); // Color azul
    } else if (estado === "Finalizada") {
      setColor(""); // Sin color dinámico
    }
  }, [estado]); // Actualiza el color cuando cambia `estado`

  return (
    <Button
      disabled={estado === "Finalizada"}
      variant="secondary"
      className={`w-full flex items-center gap-2 ${color}`}
      onClick={onClick}
    >
      {estado === "Programada" ? "Iniciar Votación" : estado === "Activa" ? "Finalizar Votación" : "Programar Votación"}
      <Play
        className="w-4 h-4 transition-transform duration-500 ease-in-out translate-x-2"
      />
    </Button>
  );
}
