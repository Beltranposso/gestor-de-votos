
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
const InfoAsamblea = ({Fecha,Inicio,Descripcion}) => {
  return (
      <ScrollArea className="bg-[#F5F5F5] text-gray-600 overflow-y-auto overflow-x-hidden  h-full p-3 w-full gap-7 break-all rounded-lg  "> 
        <div className=' bg-[#F5F5F5] sticky top-0'>
        <h1 className="text-2xl text-black ">Informacion De La Asamblea</h1>

        </div>
        <br/>
      <h2 ><strong>Fecha de creacion: {Fecha}  </strong>12/12</h2>
      <br />
     <h2><strong>Fecha de Inicio: </strong> {Inicio} </h2>
      <br />
   <strong>Descripcion De la asamblea: </strong>
   {Descripcion}Das
    </ScrollArea>
  )
}

export default InfoAsamblea
