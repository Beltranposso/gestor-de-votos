
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

import { set } from "react-hook-form";
const Votantes = ({name,Cedula, voto, estado}) => {

const[isActive, setIsActive] = useState(false);
const [abreviatura, setAbreviatura] = useState("");

  // Función para generar la abreviatura
  const generarAbreviatura = (nombre) => {
    // Dividir el nombre por espacios para obtener las partes
    const partes = nombre.split(' ');

    // Obtener la primera letra del primer nombre y el apellido (si existen)
    const primeraLetra = partes[0]?.charAt(0)?.toUpperCase();
    const segundaLetra = partes.length > 1 ? partes[1]?.charAt(0)?.toUpperCase() : '';

    // Retornar las dos primeras letras como abreviatura
    return primeraLetra + (segundaLetra || '');
  }

  // Ejecutamos la función cuando el nombre cambia
  useEffect(() => {
    if (name) {
      setAbreviatura(generarAbreviatura(name));
    }
  }, [name]);




useEffect(() => {
    if (estado === true) {
      setIsActive(true);
    }
    else{
        setIsActive(false);
    }
}, [estado]);


    return (
        <div
        className="bg-white rounded-lg p-3 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-200"
      >
    
      
          <div className="flex justify-center items-center rounded-full bg-gray-200 w-5 h-5 p-3 tex-sm">{abreviatura}</div>
        <div className="space-y-2 flex justify-between w-full">
        <div>
            <p className="text-lg w-[140px] max-w-[140px] h-8 max-h-8 overflow-ellipsis overflow-hidden text-nowrap">{name}</p>
            <p className="text-xs ">{Cedula}</p>
        </div>
        <div className="flex h-full  items-center  "><span >{voto}</span> <div className={`w-2 h-2 ml-1 rounded-full ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}>

        </div>
        </div>
      </div>
            
        </div>
    );
}
export default Votantes
