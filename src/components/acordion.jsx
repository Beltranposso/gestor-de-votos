
/*************  ✨ Codeium Command ⭐  *************/
import React from 'react';
import { Home, User, UserPlus  } from 'lucide-react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/accordion"
import {Link} from 'react-router-dom';

const MiComponente = () => {
  return (
 
    <div className='flex h-aut0 flex-col gap-2 mt-2 bg-white rounded-lg p-2 overflow-y-auto '>
    <div className="space-y-4">
<Link 
  to='Dashboard'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary"
>
  <Home className="h-5 w-5" />
  Inicio
</Link>

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="asamblea" className="border-none">
    <AccordionTrigger className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 hover:no-underline">
      Asamblea
    </AccordionTrigger>
    <AccordionContent className="pt-2">
      <div className="flex flex-col space-y-1">
        {
          <Link
          /*   key={num} */
           /*  href={`/encuesta-${num}`} */
            className="block rounded px-3 py-1.5 text-sm text-muted-foreground hover:bg-gray-100 hover:text-primary transition-colors duration-150"
          >
            Asamblea          </Link>
    }
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
<Link 
  to='listUsers'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary"
>
<User className='w-5 h-5' />
  Usuarios 
</Link>
<Link 
  to='Create'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary"
>
<UserPlus className='w-5 h-5' />
  Crear Usuario 
</Link>
</div>
</div>
  );
};

export default MiComponente;
