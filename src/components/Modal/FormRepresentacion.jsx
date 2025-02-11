import React, { useState,useEffect } from 'react';
import { User, Home, CreditCard, UserCheck } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URI28,URI31 } from '../../services/Conexiones';
import { Search, X } from 'lucide-react';
import AdvertenciaModal from '../../components/Modal/AdvertenciModal';


export default function RepresentationForm() {  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const{id} = useParams();
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Cedula: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.Nombre.trim().length < 2) {
      newErrors.Nombre = 'El nombre debe tener al menos 2 caracteres';
    }
    if (formData.Apellido.trim().length < 2) {
      newErrors.Apellido = 'El apellido debe tener al menos 2 caracteres';
    }
    if (!/^\d{7,10}$/.test(formData.Cedula)) {
      newErrors.Cedula = 'La cédula debe tener entre 7 y 10 dígitos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(URI31, {
          Nombre: formData.Nombre,
          Apellido: formData.Apellido,
          Cedula: formData.Cedula,
          usuarios: selectedUsers,
          id_card: id
        });
        if (response.status === 201 || response.status === 200) {
          alert('Registro exitoso');
          setFormData({ Nombre: '', Apellido: '', Cedula: '' });
          setSelectedUsers([]);
        }
        
      if (response.status === 210) {
            setIsConfirmationOpen(true);
        }
        
      } catch (error) {
        console.error('Error al enviar el formulario:', error); 
      } 
    }
  };

  const filteredUsers = users.filter((user) => {
    const nombre = user.Nombre ? user.Nombre.toLowerCase() : '';
    const apto = user.Apto ? user.Apto.toLowerCase() : '';
    return (
      nombre.includes(searchTerm.toLowerCase()) ||
      apto.includes(searchTerm.toLowerCase())
    );
  });

  const getUsers = async () => {
    try {
      const response = await axios.get(URI28);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Cedula') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) => {
      const exists = prev.some((selected) => selected.id === user.id);
      return exists
        ? prev.filter((selected) => selected.id !== user.id)
        : [...prev, { id: user.id, nombre: user.Nombre, quorum: user.quorum }];
    });
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <form onSubmit={handleSubmit}  className="p-8  ">
      <AdvertenciaModal
      isOpen={isConfirmationOpen}
      onClose={() => setIsConfirmationOpen(false)}
       />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Formulario de Representación</h2>
        <p className="mt-2 text-gray-600">Por favor complete todos los campos requeridos</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="Nombre"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
             
                className={`pl-10 w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
              />
            </div>
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="Apellido"
                name="Apellido"
                value={formData.Apellido}
                onChange={handleChange}
            
                className={`pl-10 w-full px-4 py-2.5 bg-gray-50 border ${
                  errors.apellido ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
              />
            </div>
            {errors.Apellido && (
              <p className="mt-1 text-sm text-red-600">{errors.Apellido}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">
            Cédula
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="Cedula"
              name="Cedula"
              value={formData.Cedula}
              onChange={handleChange}
       
              className={`pl-10 w-full px-4 py-2.5 bg-gray-50 border ${
                errors.Cedula ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
            />
          </div>
          {errors.Cedula && (
            <p className="mt-1 text-sm text-red-600">{errors.Cedula}</p>
          )}
        </div>

        <div className="relative">
          <span>Propietario a representar :</span>
       <div className="p-2">
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
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propiedad</th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coeficiente</th>
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
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.Nombre}</div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.Apto}</div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
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
      </div>

      <div className="mt-8">
            
        <button
          type='submit'
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2"
        >
          <span>Enviar Formulario</span>
        </button>
      </div>

    </form>

  );
}