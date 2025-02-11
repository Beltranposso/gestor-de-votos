import { Calendar, Delete, MapPin, Users } from 'lucide-react';
import {RoleModal} from '../../components/Modal/MoadlRol/RoleModal'
import { Link } from "react-router-dom";
import {getRouteByRole} from '../../components/rutes.js'
import { useState,useEffect } from "react";

import { Button } from "@/components/ui/button"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { use } from 'react';


const getStatusColor = (status) => {
  switch (status) {
    case 'Activa':
      return 'bg-blue-500';
      case 'Programada':
        return 'bg-amber-500';
        case 'Finalizada':
          return 'bg-green-500';
          default:
            return 'bg-gray-500';
          }
        };
        
        export default function SurveyCard({ survey, viewMode,id,title,date,Condominio,Estado,onClick,cargo,DeletedCard}) {
          const headerColor = getStatusColor(survey); 
          const isListView = viewMode === 'list';
          const [ruta, setRuta] = useState('');
          const [isModalOpen, setIsModalOpen] = useState(false);
 



          const obtenerRuta = async () => {
            const ruta = await getRouteByRole();

            setRuta(ruta);
            
             // Muestra la ruta obtenida en consola
          };




useEffect(() => {
  obtenerRuta();
}, []);







  return (
    <div className=''>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={cargo}
        Rute={`${ruta}/Cardinfo/${id}`}
      />
   
    <Card className={`hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
      isListView ? 'flex flex-col sm:flex-row ' : ''
    }`}>


   
      <button onClick={() => setIsModalOpen(true)} className='w-full text-start'>
      <div className={`${headerColor} ${isListView ? 'w-full sm:w-2 sm:h-auto' : 'h-2'}`} />
      <div className={`flex-1 ${isListView ? 'flex flex-col sm:flex-row items-center gap-4 p-4' : ''}`}>
        {!isListView && (
          <CardHeader className="pb-4">
          
            <div className="flex items-start justify-between">
              
              <div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <p className="text-sm text-gray-500">{"Asamblea"}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              Estado === 'Activa' ? 'bg-blue-100 text-blue-800' :
              Estado === 'Programada' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {Estado}
              </span>
            </div>
          </CardHeader>
        )}
        
        {isListView ? (
          <div className="flex-1 min-w-0  ">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-500">{"Asamblea"}</p>
              </div>
              <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                survey.Estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                survey.status === 'Programada' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {survey.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {date} 
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {Condominio}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {survey.attendees}
              </div>
            </div>
          </div>
        ) : (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {Condominio}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {survey.attendees}
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </button>
<div className='flex justify-end w-full pr-5 pb-2'>
<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6" size="icon">
          <MoreHorizontal className="h-5 w-2" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10 h-10">
        <DropdownMenuItem onClick={() => DeletedCard(id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
</div>
    </Card>

    </div>
  );
}