import axios from 'axios';
import { useEffect, useState } from "react";
import '/src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '/src/App.css';
import { Link,} from 'react-router-dom';
import { URI5 } from '../../services/Conexiones';
import { FileSpreadsheet } from 'lucide-react';
import  FileUploadModal  from '../../components/layouts/UploadExcelFile';
import { set } from 'react-hook-form';
export default function ListUsers() {
  const [usuarios, setUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(''); // Para el valor del input
  const [filteredUsers, setFilteredUsers] = useState(usuarios);  

  useEffect(() => {
    getUser();
     
  }, []);


  const getUser = async () => { 
    const response = await axios.get(URI5);    
    const filter = response.data.filter ((user) =>user.id_cargo === 2 );
    setUser(filter);
  };
  
   
   const deleteUser = async (cedula) => {
     location.reload();
     await axios.delete(`${URI5}${cedula}`);
     
   }

const filter = usuarios.filter ((user) =>user.id_cargo === 2 );  

   useEffect(() => {
    const value = searchValue.trim().toLowerCase();
  
    if (value === '') {
      setFilteredUsers(usuarios); // Mostrar todos los usuarios si no hay búsqueda
    } else {
      const result = usuarios.filter((user) => {
        return (
          user.Cedula.toString().toLowerCase().includes(value) ||
          user.Nombre.toLowerCase().includes(value) ||
          user.Apellido.toLowerCase().includes(value) ||
          user.Correo.toLowerCase().includes(value)
        );
      });
  
      setFilteredUsers(result); // Mostrar los usuarios filtrados
    }
  }, [searchValue, usuarios]); // 
  const searchuser = (e) => {
    setSearchValue(e.target.value); // Actualizamos el estado del valor de búsqueda
  };

  return (

      <main className='flex items-center justify-center h-full w-full'>
             <FileUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onFileUpload={''}
          id={id}
        />
    <div className="ContenedorUsers">
      <div className="share_Listuser">
        <h1>Usuarios Registrados</h1>
        <div className="search">
          <input type="text" className="search__input" placeholder="Buscar"  value={searchValue} onChange={searchuser} />
          <div className="flex h-12   justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-3 rounded-lg bg-emerald-600 px-6  py-3  font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <FileSpreadsheet className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Importar
          </button>
        </div>
        </div>
      </div>
      <div className=" overflow-auto h-[55%] px-10 pb-10">      
        <table className="table table-striped" >
  <thead>
    <tr  className='table-primary '>
   
      <th scope="col">C.C</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Correo</th>
     
      <th scope="col">P.adquisitivo</th>
      <th scope="col">N.apto</th>
      <th scope="col">Usuario</th>
      <th></th>

    </tr>
  </thead>
  <tbody>
  {filteredUsers.map((user) => (
              <tr key={user.id}>
                 <th>{user.Cedula}</th>
                <th>{user.Nombre}</th>
                <th>{user.Apellido}</th>
                <th>{user.Correo}</th>
               
               
                <th>{user.poder}</th>
                <th>2</th>
                <th>{(user.id_cargo===1?"Admin":(user.id_cargo===2?"OP.Reguistro":"null"))}</th>
              
              <th className='d-flex gap-3 '>   
                <Link to={`/listUsers/UpdateUser/${user.Cedula}`}  className=' d-flex align-items-center btn btn-info'><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                    </svg>
                </Link>
                <button   className=' d-flex align-items-center btn btn-danger' onClick={()=>deleteUser(user.Cedula)}   ><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18  } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>

              </th>
              </tr>
            ))}
  </tbody>
</table>
      </div>
    </div>
    </main>
    
   
  );
}