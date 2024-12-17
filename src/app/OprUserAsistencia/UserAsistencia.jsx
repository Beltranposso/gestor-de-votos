import React,{ useState,useEffect} from 'react';
import { Search,FileSpreadsheet } from 'lucide-react';
import Table from '../../components/Table';
import NavM from '../../components/NavSegment';
import {URI13,URI5,URI15,URI16,URI17} from '../../services/Conexiones';
import  FileUploadModal  from '../../components/layouts/UploadExcelFile';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NoUsersCargados from '../../components/NouserCargados';
import {  User  } from 'lucide-react'
import CountUser from '../../components/CountUser';
import { use } from 'react';
import io from 'socket.io-client';


const BaseComponent = () => {
 /*  const socket = io('http://localhost:8000/'); */
 const socket = io('https://serverapivote.co.control360.co/');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[users,setUsers]=useState([]);
  const[App_users,setApp_users]=useState([]);
  const [NavMenu, setNavMenu] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState('');
  const[UserLabel,setUserLabel]=useState("Usuarios");
  const [searchValue, setSearchValue] = useState(''); // Para el valor del input
  const [filteredUsers, setFilteredUsers] = useState([]);
  const{id}=useParams();


const getUser = async () => {
  const response = await axios.get(URI13+id);
  setUsers(response.data);
  setUserLabel("Usuarios");
};
useEffect(() => {
  getUser();
},[])


const SetAsistencia = async (Cedula,asistencia) => {
  if(asistencia){
  const response = await axios.put(`${URI17}${Cedula}`);
 
  socket.emit('Asistencia', Cedula);
  
  getUser();
  }
  else{
   
  }
};



useEffect(() => {
  
  
    const value = searchValue.trim().toLowerCase();
    let result;
  
    if (value === '') {
      result = Array.isArray(users) ? users : [];
    } else {
      result = Array.isArray(users)
        ? users.filter((user) => {
            return (
              user?.Cedula?.toString().toLowerCase().includes(value) ||
              user?.Nombre?.toLowerCase().includes(value) ||
              user?.Apellido?.toLowerCase().includes(value) ||
              user?.Correo?.toLowerCase().includes(value)
            );
          })
        : [];
    }
  
    // Solo actualiza si `result` es diferente de `filteredUsers`
    setFilteredUsers((prevFilteredUsers) => {
      const isEqual = JSON.stringify(prevFilteredUsers) === JSON.stringify(result);
      return isEqual ? prevFilteredUsers : result;
    });
  }, [users, searchValue]);

  const searchuser = (e) => {
    setSearchValue(e.target.value); // Actualizamos el estado del valor de búsqueda
  };



  return (

    <div className='flex w-full h-screen justify-center items-center pt-5'>
      <div className='flex flex-col h-full w-[90%] '>

     
          <FileUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileUpload={''}

          id={id}
        />
      <header className='w-full h-[150px]  flex flex-col justify-between gap-10'>
        <div className='w-full flex justify-between pr-10 '>
        <h1 className='text-4xl '>Control de registro</h1>
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
          
            </div>

       
            </div>

  
  
  </div>


      </header> 
   
       
      <main className='h-full flex flex-col  items-star overflow-y-auto '>
      {users.message==='No hay usuarios'? <NoUsersCargados id={id} Usuario={UserLabel}></NoUsersCargados>:<Table  text={searchValue}  usuarios={filteredUsers} Asistencia={SetAsistencia} ></Table>} 

      </main>


    </div> 
    </div>
  );
};

export default BaseComponent;
