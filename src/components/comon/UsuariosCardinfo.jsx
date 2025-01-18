import React,{ useState,useEffect} from 'react';
import { Search,FileSpreadsheet } from 'lucide-react';
import Table from '../Table';
import NavM from '../NavSegment';
import {URI13,URI5,URI15,URI16,URI17,URI22} from '../../services/Conexiones';
import  FileUploadModal  from '../layouts/UploadExcelFile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoUsersCargados from '../NouserCargados';
import {  User  } from 'lucide-react'
import CountUser from '../CountUser';
import io from 'socket.io-client';
import {getRouteByRole} from '../../components/rutes.js'



/* const socket = io('http://localhost:8000/'); */
const socket = io('https://serverapivote.co.control360.co/');

const BaseComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[users,setUsers]=useState([]);
  const[App_users,setApp_users]=useState([]);
  const [NavMenu, setNavMenu] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState('');
  const[UserLabel,setUserLabel]=useState("Usuarios");
  const [searchValue, setSearchValue] = useState(''); // Para el valor del input
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [rute,setRuta]=useState("");
  const[señal2,setsenal2]=useState(false);
  const [funcion, setFuncion] = useState(() => {
    return () => {
    
    }
  });
  const{id}=useParams();

  

const getUser = async () => {
  const response = await axios.get(URI13+id);
  setUsers(response.data);
  setUserLabel("Usuarios");
};
const getAPPUsers = async () => {
  const response = await axios.get(URI16+id);
  /* const filter = response.data.filter ((user) =>user.cargo === 2 ); */
  setUsers(response.data);
  setUserLabel("Operadores");
};
const getAPPUsers2 = async () => {
  const response = await axios.get(URI15+id);
  setUsers(response.data);
  setUserLabel("Coordinadores");
};

const deleteUser = async (cedula) => {
  // Determina la URI según el valor de NavMenu
  const deleteURI = (NavMenu === "coordinador" || NavMenu === "registro") ? URI5 : URI13;

  try {
    // Realiza la solicitud para eliminar el usuario
    const response = await axios.delete(`${deleteURI}${cedula}`);
    
    // Muestra el mensaje del backend en la consola
    console.log(response.data.message);

    // Llama a la función correspondiente para actualizar la lista según NavMenu
    if (NavMenu === "usuarios") {
      await getUser(); // Actualiza la lista de usuarios
    } else if (NavMenu === "registro") {
      await getAPPUsers(); // Actualiza la lista de operadores
    } else if (NavMenu === "coordinador") {
      await getAPPUsers2(); // Actualiza la lista de coordinadores
    }

 
  } catch (error) {
    // Maneja errores del backend y muestra un mensaje adecuado
    if (error.response) {
      console.error("Error del servidor:", error.response.data.message);
    } else {
      console.error("Error desconocido al eliminar el usuario:", error.message);
    }
  }
};
const obtenerRuta = async () => {
  const ruta = await getRouteByRole();
 
  setRuta(ruta);

   // Muestra la ruta obtenida en consola
};

const SetAsistencia = async (Cedula, asistencia) => {
  try {
    // Enviar la solicitud PUT al backend con el valor de 'asistencia' que puede ser "Presente" o "Ausente"
    const response = await axios.put(`${URI17}${Cedula}`, { asistencia });
      socket.emit('Estado', Cedula);
      

    // Emitir los eventos de socket para actualizar la asistencia y el estado
    socket.emit('Asisten', Cedula);

    // Obtener la lista de usuarios actualizada
    getUser();
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error.message);
  }
};




const setAsitenciaOpe = async (Cedula, asistencia) => {
  if (asistencia) {
    try {
      const response = await axios.put(`${URI22}${Cedula}`);
      getAPPUsers()
      socket.emit('Asistencia', Cedula);
      socket.emit('Estado', Cedula);
  
    } catch (error) {
      console.error("Error al actualizar asistencia:", error);
    }
  } else {
  
  }
};



useEffect(() => {
if(NavMenu==="usuarios"){

  getUser();
  setFuncion(()=> SetAsistencia)
}else if(NavMenu==="registro"){
  getAPPUsers();
  setFuncion(()=> setAsitenciaOpe)

}else if (NavMenu==="coordinador"){
  getAPPUsers2();
}
},[NavMenu]);



useEffect(() => {
  localStorage.setItem('NavMenu', NavMenu);
}, [NavMenu]); 



useEffect(() => {


  const value = searchValue.trim().toLowerCase();

  if (value === '') {
    setFilteredUsers(Array.isArray(users) ? users : []);
  } else {
    const result = Array.isArray(users)
      ? users.filter((user) => {
          return (
            user?.Cedula?.toString().toLowerCase().includes(value) ||
            user?.Nombre?.toLowerCase().includes(value) ||
            user?.Apellido?.toLowerCase().includes(value) ||
            user?.Correo?.toLowerCase().includes(value)
          );
        })
      : [];

    setFilteredUsers(result);
  }
}, [users, searchValue]);

  const searchuser = (e) => {
    setSearchValue(e.target.value); // Actualizamos el estado del valor de búsqueda
  };

  
useEffect(() => {
  obtenerRuta();
}, []);



  

  return (
    <div className='flex flex-col w-full h-full '>
          <FileUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileUpload={''}

          id={id}
        />
      <header className='w-full h-[150px]  flex flex-col justify-between gap-10'>
        <div className='w-full flex justify-between pr-10 '>
        <h1 className='text-4xl '>Usuarios de la Asamblea</h1>
        <CountUser count={filteredUsers.length}></CountUser>
        </div>



        <div className='w-full  flex gap-3'>

        <div className="relative w-full max-w-2xl  mb-3 ml-5  ">
                 <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Search className="h-5 w-5 text-muted-foreground text-black" />
                </div>
                <input
                    type="search" 
                    placeholder="Busca un usuario perteneciente a la asamblea"
                    
                    className="h-12  flex items-center w-full bg-background/5 rounded-full pl-10 text-base placeholder:text-muted-foreground focus-visible:ring-1 dark text-dark bg-[#F5F5F5] focus-visible:ring-slate-400 border border-slate-200"
                    value={searchValue} onChange={searchuser}
                    />        
            </div>

            <div className='w-full flex gap-10  '>

            <div className="flex items-center  h-12">
            <NavM
                defaultValue="usuarios"
                onValueChange={(value) => {
                  setNavMenu(value)
                }}  
            />
            </div>

            <button
            onClick={() => setIsModalOpen(true)}
            className={NavMenu === "coordinador" || NavMenu === "registro" ? "invisible": "relative flex  items-center gap-3  w-auto h-11 rounded-full bg-emerald-600 px-6  py-3  font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"}
   
          >
            <FileSpreadsheet className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Importar
          </button>
            </div>

  
  
  </div>


      </header> 
   
       
      <main className='h-full flex flex-col  items-star overflow-y-auto '>
      {users.message==='No hay usuarios'? <NoUsersCargados rute={rute} id={id} Usuario={UserLabel}></NoUsersCargados>:<Table onclik={deleteUser} text={searchValue}  usuarios={filteredUsers} Asistencia={funcion} ></Table>} 

      </main>


    </div>
  );
};

export default BaseComponent;
