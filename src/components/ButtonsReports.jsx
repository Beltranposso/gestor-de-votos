


import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MoreVertical, Edit, Trash, Share, Download, Star } from 'lucide-react'
import AnimatedStartButton from "./ButtonCretedPdf"
import ButttoExcel from "./ButtonCreatedExcel.jsx"
import ButtonVotacionesPdf from "./ButtonCreatepdfPreguntas.jsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"






export default function VerticalDotsButton({ estado ,id}) {
    const [isOpen, setIsOpen] = useState(false)
 







    
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full p-0 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <span className="sr-only">Más opciones</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] mr-10">
      <ul className='flex flex-col gap-2'>

        <AnimatedStartButton estado={estado} id={id}></AnimatedStartButton>
        <ButttoExcel estado={estado} id={id} ></ButttoExcel>
        <ButtonVotacionesPdf  id={id} estado={estado}></ButtonVotacionesPdf>

      </ul>
     
      </PopoverContent>
    </Popover>
  )
}







{/* <Button
variant="ghost"
className="w-full justify-start"
onClick={() => {
  item.onClick()
  setIsOpen(false)
}}
>
<item.icon className="mr-2 h-4 w-4" />
{item.label}
</Button> */}