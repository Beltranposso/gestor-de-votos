import axios from 'axios';
import { useEffect, useState } from "react";
import Data_User from "./Datauser";
import '../App.css';
import '../Animations.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Hme from './Hme'
import { Link,} from 'react-router-dom';

const URI = 'http://localhost:8001/usuarios/';

export default function ListUsers() {
  const [usuarios, setUser] = useState([]);

  useEffect(() => {
    getUser();
     
  }, []);

  const getUser = async () => {
    const response = await axios.get(URI);
    setUser(response.data);
  };
  
   
   const deleteUser = async (id) => {
     location.reload();
     await axios.delete(`${URI}${id}`);
     
   }






  return (
    <div className='content'>
     <Hme></Hme>
      <main className='main'>
    <div className="ContenedorUsers">
      <div className="share_Listuser">
        <h1>Usuarios Registrados</h1>
        <div className="search">
          <input type="text" className="search__input" placeholder="Buscar" />
          <Link to='/listUsers/Create' className="create-button  btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
                </svg>    
          </Link>
        </div>
      </div>
      <div className="Data_User">      
        <table className="table table-striped" >
  <thead>
    <tr  className='table-primary '>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Correo</th>
      <th scope="col">C.C</th>
      <th scope="col">P.adquisitivo</th>
      <th scope="col">N.apto</th>
      <th scope="col">Usuario</th>
      <th></th>

    </tr>
  </thead>
  <tbody>
  {usuarios.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.Nombre}</th>
                <th>{user.Apellido}</th>
                <th>{user.Correo}</th>
                <th>{user.Cedula}</th>
                <th>35%</th>
                <th>2</th>
                <th>usuario</th>
              <th className='d-flex gap-3 '>   
                <Link to={`/listUsers/UpdateUser/${user.id}`}  className=' d-flex align-items-center btn btn-info'><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-pencil-plus">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                  <path d="M13.5 6.5l4 4" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                    </svg>
                </Link>
                <button   className=' d-flex align-items-center btn btn-danger' onClick={()=>deleteUser(user.id)}   ><svg xmlns="http://www.w3.org/2000/svg" width={18} height={18  } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
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
    </div>
   
  );
}