import React, { useState,useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { ConfirmationModal } from './ConfirmacionPoderes';
import { URI28,URI29 } from '../../services/Conexiones';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { use } from 'react';




export default function UserListModal({ isOpen, onClose,Cedula,Casa,Nombre }) {
  const [users,setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const {id} = useParams();
  
  const filteredUsers = users.filter(user => {
    const nombre = user.Nombre ? user.Nombre.toLowerCase() : '';
    const apto = user.Apto ? user.Apto.toLowerCase() : '';
    
    return (
      nombre.includes(searchTerm.toLowerCase()) || 
      apto.includes(searchTerm.toLowerCase())
    );
  });
  



  /* usuarios seleccinados */
  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) => {
      const exists = prev.some(selected => selected.id === user.id);
      const updated = exists
        ? prev.filter(selected => selected.id !== user.id)
        : [...prev, { id: user.id, nombre: `${user.Nombre}` ,quorum: `${user.quorum}`}];
    
      return updated;
    });
  }
console.log("usuarios seleccionados: ",selectedUsers)

  const handleDelegatePowers = async () => {
    // Convertir los quorum seleccionados a tipo float y calcular la suma total
    const totalQuorum = selectedUsers.reduce((sum, user) => {
      return sum + parseFloat(user.quorum || 0); // Convertir quorum a float y manejar valores no numéricos
    }, 0);
    const userlength = selectedUsers.length;
  

      try{
            const response = await axios.post(URI29, {idcard:id, cedula:Cedula,quorumAAgregar:totalQuorum,PoderesDelegados:userlength,Usuarios:selectedUsers,Representante:Nombre });

            if (response.status === 200) {
              
            }
            
        }catch(error){

              console.log(error)
        }

};

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
    setSelectedUsers([]);
  };

  const selectedUserNames = selectedUsers.map(user => user.nombre);


  const getuser = async () => {

    try {
      const response = await axios.get(URI28);
      setUser(response.data);
      
    }catch (error) {
      console.log(error);
    }
  }


useEffect(() => {
  getuser();
}, []);







  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[999]">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center justify-between w-full ">

            <span className="text-xl font-semibold text-gray-800">Delegacion de poderes</span>
            <button
              onClick={() => setIsConfirmationOpen(true)}
              disabled={selectedUsers.length === 0}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                selectedUsers.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Delegar poderes
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seleccionar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propiedad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coeficiente</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user,index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                       type="checkbox"
                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                       checked={selectedUsers.some(selected => selected.id === user.id)}
                       onChange={() => handleCheckboxChange(user)} // Pasa el objeto completo
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.Nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.Apto}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.quorum}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleConfirmationClose}
        onConfirm={handleDelegatePowers}
        selectedUsers={selectedUserNames}
        Nombre={Nombre}
        Casa={Casa}
      />
    </div>
  );
}