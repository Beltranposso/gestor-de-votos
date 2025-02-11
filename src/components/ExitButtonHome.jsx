import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"              
import { useState } from 'react'



export default function ExitButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
    variant="secondary"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Salir"
      className="hover:bg-red-600 hover:text-white w-full" 
      
    >
      <ArrowLeft 
        className={`h-4 w-4 mr-2 transition-transform duration-300 ${
          isHovered ? '-translate-x-2' : ''
        }`} 
      />
      <span>Salir</span>
    </Button>
  )
}
