import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,TableFooter,  TableCaption,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from "axios"
import { URI, URI5,URI17 } from "../services/Conexiones"
import  TableSkeleton  from "./skeletonTable"
import { useState,useEffect } from "react"
import NoshareUser from "./NoshareUser"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export default function UserList({onclik,usuarios =[],Asistencia,text,ListModal,Open,NavMenu}) {
  const Cargo = localStorage.getItem('C');
  const c = atob(Cargo);

  const [keys, setKeys] = useState(() => {
    const ordenDeseado = ["Apellido", "Correo", "Contraseña", "Cedula", "quorum", "Apto"];
    const keysADescartar = ["createdAt", "updatedAt", "id", "id_card", "Nombre", "EstadoVoto", "cargo", "Cargo","HoraDellegada"];
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
     
    } catch (error) {
      // Manejar errores y mostrarlos en la consola
      console.error("Error al actualizar la asistencia:", error.message);
    }
  };
 */


 

  useEffect(() => {
    if (usuarios.length > 0) {
      // Define el orden deseado de las claves y las claves a descartar
      const ordenDeseado = ["Apellido", "Correo", "Contraseña", "Cedula", "coeficiente", "Propiedad"];
      const keysADescartar = ["createdAt", "updatedAt", "id", "id_card", "Nombre", "EstadoVoto", "cargo", "Cargo", "Asistencia", "HoraDellegada", "PoderesDelegados", "RegisterQuorum", "esRepresentado", "Representante", "esApoderado"];
  
      // Filtra las claves de los usuarios y cambia los nombres según lo especificado
      const filteredKeys = Object.keys(usuarios[0])
        .filter(key => !keysADescartar.includes(key)) // Filtra claves no deseadas
        .map(key => {
          if (key === "quorum") {
            return "coeficiente";  // Renombrar "quorum" a "coeficiente"
          } 
          if (key === "Apto") {
            return "Propiedad";  // Renombrar "Apto" a "Propiedad"
          }
          return key; // Si no es necesario renombrar, se mantiene la clave original
        })
        .sort((a, b) => {
          const indexA = ordenDeseado.indexOf(a);
          const indexB = ordenDeseado.indexOf(b);
          // Si la clave no está en el orden deseado, devolver un valor mayor para mantener su posición original
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;  // Ordena según el índice en el array ordenDeseado
        });
  
      // Actualiza las claves filtradas y la lista de usuarios
      setKeys(filteredKeys);   // Actualiza las claves filtradas
      setUsers(usuarios);      // Actualiza la lista de usuarios
      setLoading(false);       // Detiene la carga
    }
  }, [usuarios]);
  


console.log("usuarios",usuarios);

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
  <TableRow className={user.esApoderado==="Si"? "border-1 border-cyan-600":""} key={index}>
    <TableCell className="font-medium hover:bg-muted cursor-pointer transition-colors">{user.Nombre}</TableCell>
    <TableCell className="hidden md:table-cell">{user.Apellido}</TableCell>
    <TableCell className="hidden sm:table-cell underline sm:overflow-ellipsis">{user.Correo}</TableCell>
    <TableCell className={estate ? "hidden xl:table-cell" : "hidden" }>{user.Contraseña}</TableCell>         
    <TableCell className="hidden lg:table-cell">{user.Cedula}</TableCell>
    <TableCell className={estate ?"hidden":"hidden lg:table-cell  "}>{user.quorum}</TableCell>
    <TableCell className={estate ?"hidden":"hidden lg:table-cell"}>{user.Apto}</TableCell>

    <TableCell>
      <Badge variant={ user.cargo === 2|| user.cargo === 3 ? "default" : "secondary" }>
        {user.cargo === 2 ? "operador" : user.cargo === 3 ? "coordi" : "user"}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <Button  onClick={() =>onclik(user.Cedula)} variant="ghost"  size="icon" className={c==="Operador de registro"? "hidden" : " hover:text-red-600"}>
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button  onClick={() =>{ ListModal(user.Cedula,user.Nombre,user.Apto)}} variant="ghost" size="icon" className={c==="Administrador"||c==="Coordinador"? "hidden" : " hover:text-blue-600"}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button  className={c==="Operador de registro"? "hidden" : " hover:text-blue-600"} onClick={() =>Open(user.id)} variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <Switch
  checked={user.Asistencia === "Presente"} // El switch está marcado si la asistencia es "Presente"
  onCheckedChange={(checked) => {
    const asistencia = checked ? "Presente" : "Ausente"; // Dependiendo de si está marcado o no
    Asistencia(user.Cedula, asistencia); // Llamar a la función SetAsistencia con la cédula y el nuevo valor de asistencia
  }}
  className={user.cargo === 3 ? "hidden" : ""} // Opcional: esconder el switch si el cargo es 3
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
)):(
  <TableRow>
    <TableCell colSpan={8} ><NoshareUser searchTerm={text}/></TableCell>
   
  </TableRow>
)} 


          </TableBody>
        </Table>}
      </div>
    </div>
  )
}

 