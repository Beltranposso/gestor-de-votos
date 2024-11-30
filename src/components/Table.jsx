import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { URI, URI5,URI17 } from "../services/Conexiones"
import  TableSkeleton  from "./skeletonTable"
import { useState,useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export default function UserList({onclik,usuarios =[],Asistencia}) {


  const [keys, setKeys] = useState(() => {
    const ordenDeseado = ["Apellido", "Correo", "Contraseña", "Cedula", "quorum", "Apto"];
    const keysADescartar = ["createdAt", "updatedAt", "id", "id_card", "Nombre", "EstadoVoto", "cargo", "Cargo"];
    return usuarios.length > 0
      ? Object.keys(usuarios[0])
          .filter(key => !keysADescartar.includes(key))
          .sort((a, b) => ordenDeseado.indexOf(a) - ordenDeseado.indexOf(b))
      : [];
  });
  const [u, setUsers] = useState(usuarios || []);
  const [estate, setestate] = useState(usuarios.length > 0 && "Contraseña" in usuarios[0]);
  const [loading, setLoading] = useState(true)
  const[estadoPrev, setEstadoPrev] = useState(false)

  
/* 
  const handleAsistenciaChange = async (Cedula) => {
    try {
      // Realizar la solicitud PUT al endpoint con la cédula
      const response = await axios.put(`${URI17}${Cedula}`);
  
      // Confirmar en la consola que el usuario fue actualizado correctamente
      console.log("Usuario actualizado correctamente:", response.data);
    } catch (error) {
      // Manejar errores y mostrarlos en la consola
      console.error("Error al actualizar la asistencia:", error.message);
    }
  };
 */


 


  useEffect(() => {
    if (usuarios.length > 0) {
      const ordenDeseado = ["Apellido", "Correo", "Contraseña", "Cedula", "quorum", "Apto"];
      const keysADescartar = ["createdAt", "updatedAt", "id", "id_card", "Nombre", "EstadoVoto", "cargo", "Cargo","Asistencia"];
      
      const filteredKeys = Object.keys(usuarios[0])
        .filter(key => !keysADescartar.includes(key)) // Filtrar claves no deseadas
        .sort((a, b) => ordenDeseado.indexOf(a) - ordenDeseado.indexOf(b)); // Ordenar según el orden deseado
  
      setKeys(filteredKeys); // Actualiza las claves
      setUsers(usuarios);
      setLoading(false);    // Actualiza la lista de usuarios
    }
  }, [usuarios]);


useEffect(() => {
  if (usuarios.length > 0 && "Contraseña" in usuarios[0]) { // Verifica si la clave existe en el objeto
    setestate(true);
  } else {
    setestate(false);
  }
}, [u])




  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
       { loading ? <TableSkeleton rows={3} columns={4} /> : <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Nombre</TableHead> 
              {keys.map((key) => (
                <TableHead className="hidden sm:table-cell" key={key}>{key}</TableHead>
              ))}
            
            <TableHead className ="sm:hiden ">usuario</TableHead>
              <TableHead className>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {usuarios.length > 0  ? u.map((user,index) => (
  <TableRow key={index}>
    <TableCell className="font-medium hover:bg-muted cursor-pointer transition-colors">{user.Nombre}</TableCell>
    <TableCell className="hidden md:table-cell">{user.Apellido}</TableCell>
    <TableCell className="hidden sm:table-cell underline sm:overflow-ellipsis">{user.Correo}</TableCell>
    <TableCell className={estate ? "hidden xl:table-cell" : "hidden" }>{user.Contraseña}jkhgjhg</TableCell>         
    <TableCell className="hidden lg:table-cell">{user.Cedula}</TableCell>
    <TableCell className={estate ?"hidden":"hidden lg:table-cell"}>{user.quorum}</TableCell>
    <TableCell className={estate ?"hidden":"hidden lg:table-cell"}>{user.Apto}</TableCell>

    <TableCell>
      <Badge variant={ user.cargo === 2|| user.cargo === 3 ? "default" : "secondary" }>
        {user.cargo === 2 ? "operador" : user.cargo === 3 ? "coordi" : "user"}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <Button onClick={() =>onclik(user.Cedula)} variant="ghost"  size="icon" className=" hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <Switch
         checked={user.Asistencia === "Presente"} 
          onCheckedChange={(cheked)=>Asistencia(user.Cedula,cheked)}
        
          className={user.cargo === 2 || user.cargo === 3 ? "hidden" : ""}
      />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 sm:hidden">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Ver detalles
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  </TableRow>
)):<div className="w-full h-full flex items-center justify-center">no hay datos</div>} 


          </TableBody>
        </Table>}
      </div>
    </div>
  )
}

 