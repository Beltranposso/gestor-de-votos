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
import ListModal from '../../components/Modal/ModalListUser';
import { Plus } from 'lucide-react';
import Modal from '../../components/Modal/ModalContent';
import FormularioModal from '../../components/Modal/FormRepresentacion';
import io from 'socket.io-client';



const BaseComponent = () => {
 /*  const socket = io('http://localhost:8000/'); */
 const socket = io('https://serverapivote.co.control360.co/'); 
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const[users,setUsers]=useState([]);
  const[App_users,setApp_users]=useState([]);
  const [NavMenu, setNavMenu] = useState("usuarios");
  const [searchTerm, setSearchTerm] = useState('');
  const[UserLabel,setUserLabel]=useState("Usuarios");
  const [searchValue, setSearchValue] = useState(''); // Para el valor del input
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cedula,setcedula] = useState();
  const  [Name,setName] = useState();
  const [Casa, setCasa] = useState();

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const{id}=useParams();


const getUser = async () => {
  const response = await axios.get(URI13+id);
  setUsers(response.data);
  setUserLabel("Usuarios");
};



useEffect(() => {
  getUser();
},[])


const SetAsistencia = async (Cedula, asistencia) => {
  try {
    // Enviar la solicitud PUT al backend con el valor de 'asistencia' que puede ser "Presente" o "Ausente"
    const response = await axios.put(`${URI17}${Cedula}`, { asistencia });
      socket.emit('Estado', Cedula);
      socket.emit('Asisten', Cedula);

    // Obtener la lista de usuarios actualizada
    getUser();
  } catch (error) {
    console.error("Error al actualizar la asistencia:", error.message);
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


const handleOpenModal2 = (cedula,name,Casa) => {
  setcedula(cedula); // Actualizar el estado de 'cedula'
  setname(name);
  setcasa(Casa);
  setIsModalOpen3(true);
};



  const handleOpenModal = (cedula,name,Casa) => {
    setcedula(cedula); // Actualizar el estado de 'cedula'
    setName(name);
    setCasa(Casa);
    setIsModalOpen3(true);
  };








  return (

    <div className='flex w-full h-screen justify-center items-center pt-5'>


      <Modal  isOpen={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
          <FormularioModal></FormularioModal>
      </Modal>






      <ListModal
              isOpen={isModalOpen3}
              onClose={() => setIsModalOpen3(false)}  
              Cedula={cedula}
              Nombre={Name}
              Casa={Casa}
              
      ></ListModal>

      <div className='flex flex-col h-full w-[90%]'>

     
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
                    className="h-12  flex items-center w-full bg-background/5 rounded-full pl-10 text-base placeholder:text-muted-foreground 
                    focus-visible:ring-1 dark text-dark bg-[#F5F5F5] focus-visible:ring-slate-400 border border-slate-200"
                    value={searchValue} onChange={searchuser}
/>      

            </div>

            <div className='w-full flex gap-10  justify-end '>

         
            <button
        onClick={() => setIsModalOpen2(true)}
        className="bg-white  text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center w-auto h-auto"
      >
       <Plus></Plus>
    
      </button>


            

       
            </div>

  
  
  </div>


      </header> 
   
       
      <main className='h-full flex flex-col  items-star overflow-y-auto '>
      {users.message==='No hay usuarios'? <NoUsersCargados id={id} Usuario={UserLabel}></NoUsersCargados>:<Table  text={searchValue}  usuarios={filteredUsers} Asistencia={SetAsistencia}  ListModal={handleOpenModal}></Table>} 

      </main>


    </div> 
    </div>
  );
};

export default BaseComponent;
