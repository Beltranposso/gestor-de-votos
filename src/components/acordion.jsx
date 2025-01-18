
/*************  ✨ Codeium Command ⭐  *************/
import React from 'react';
import { Home, User, UserPlus ,FileCheck } from 'lucide-react'
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
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary hover:bg-gray-100 py-2"
>
  <Home className="h-5 w-5" />
  Inicio
</Link>


<Link 
  to='listUsers'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary hover:bg-gray-100 py-2"
>
<User className='w-5 h-5' />
  Usuarios 
</Link>
<Link 
  to='Create'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary hover:bg-gray-100 py-2"
>
<UserPlus className='w-5 h-5' />
  Crear Usuario 
</Link>

<Link 
  to='CreateVotacion'
  className="flex items-center h-7 pl-1 rounded-lg gap-2 text-sm font-medium text-foreground hover:text-primary hover:bg-gray-100 py-2"
>
<FileCheck className='w-5 h-5' />
  Crear votacion 
</Link>
</div>
</div>
  );
};

export default MiComponente;
