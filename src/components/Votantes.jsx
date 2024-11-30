
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"

import { set } from "react-hook-form";
const Votantes = ({name,Cedula, voto, abreviatura,estado}) => {

const[isActive, setIsActive] = useState(false);


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
        className="flex mx-2 items-center space-x-4 p-3 bg-white rounded-md shadow-sm overflow-hidden"
      >
    
        <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-300 h-12 w-12" >{abreviatura||""}</AvatarFallback>
            </Avatar>
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
