
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
const InfoAsamblea = ({Fecha,Condominio,Descripcion}) => {
  return (
      <ScrollArea className=" text-gray-600 overflow-y-auto overflow-x-hidden shadow-xl   h-full p-3 w-full gap-7 break-all rounded-lg  "> 
        <div className='  sticky top-0'>
        <h1 className="text-2xl text-black ">Informacion De La Asamblea</h1>

        </div>
        <br/>
      <h2 ><strong>Fecha de creacion:  {Fecha} </strong></h2>
      <br />
     <h2><strong>Condominio:  </strong> {Condominio} </h2>
      <br />
   <strong>Descripcion De la asamblea: </strong>
   {Descripcion} 
    </ScrollArea>
  )
}

export default InfoAsamblea
