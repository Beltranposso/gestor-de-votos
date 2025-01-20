import React, { useState, useEffect } from 'react';
import { X, UserCircle, Mail, Building, FileText, Briefcase, Lock } from 'lucide-react';
import axios from 'axios';
import { URI35,URI34 } from '../../services/Conexiones';
const UpdateInfoModal = ({ isOpen, onClose, NavMenu, IDUSER, Data = [] }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Correo: '',
    Cedula: '',
    Propiedad: '',
    Coeficiente: '',
    Cargo: '2',
    Password: ''
  });

  useEffect(() => {
    if (Data) {
      setFormData({
        Nombre: Data.Nombre || '',
        Apellido: Data.Apellido || '',
        Correo: Data.Correo || '',
        Cedula: Data.Cedula || '',
        Propiedad: Data.Apto || '',
        Coeficiente: Data.quorum || '',
        Cargo: '2',
        Password: Data.Contraseña || ''
      });
    }
  }, [Data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = NavMenu === "usuarios" ? URI35 : URI34;
      const payload = NavMenu === "usuarios" 
        ? {
            Nombre: formData.Nombre,
            Apellido: formData.Apellido,
            Correo: formData.Correo,
            Cedula: parseInt(formData.Cedula),
            quorum: parseFloat(formData.Coeficiente),
            Apto: formData.Propiedad
          }
        : {
            Nombre: formData.Nombre,
            Apellido: formData.Apellido,
            Correo: formData.Correo,
            Cedula: parseInt(formData.Cedula),
            cargo: parseInt(formData.Cargo),
            Contraseña: formData.Password
          };

      const response = await axios.put(`${endpoint}${IDUSER}`, payload);
      
      if (response.status === 200) {
        onClose();
        // You might want to add a success notification here
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // You might want to add an error notification here
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 z-[9999]">
      <div className="bg-white rounded-xl w-full max-w-2xl relative shadow-2xl animate-in slide-in-from-bottom-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Actualización de Datos</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label htmlFor="Nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="Nombre"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <UserCircle className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Apellido */}
              <div>
                <label htmlFor="Apellido" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="Apellido"
                    name="Apellido"
                    value={formData.Apellido}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <UserCircle className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="Correo" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="Correo"
                    name="Correo"
                    value={formData.Correo}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <Mail className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Cedula */}
              <div>
                <label htmlFor="Cedula" className="block text-sm font-medium text-gray-700 mb-1">
                  Cédula
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="Cedula"
                    name="Cedula"
                    value={formData.Cedula}
                    onChange={handleInputChange}
                    pattern="[0-9]*"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <FileText className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Propiedad */}
              <div>
                <label htmlFor="Propiedad" className="block text-sm font-medium text-gray-700 mb-1">
                  Propiedad
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="Propiedad"
                    name="Propiedad"
                    value={formData.Propiedad}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    disabled={NavMenu === 'registro' || NavMenu === 'coordinador'}
                  />
                  <Building className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Coeficiente */}
              <div>
                <label htmlFor="Coeficiente" className="block text-sm font-medium text-gray-700 mb-1">
                  Coeficiente
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="Coeficiente"
                    name="Coeficiente"
                    value={formData.Coeficiente}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                    disabled={NavMenu === 'registro' || NavMenu === 'coordinador'}
                  />
                  <Building className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>

              {/* Cargo */}
              <div className="col-span-2">
                <label htmlFor="Cargo" className="block text-sm font-medium text-gray-700 mb-1">
                  Cargo
                </label>
                <div className="relative">
                  <select
                    id="Cargo"
                    name="Cargo"
                    value={formData.Cargo}
                    onChange={handleInputChange}
                    className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg ${
                      NavMenu === 'usuarios' ? 'text-white' : 'bg-gray-50'
                    }`}
                    required
                    disabled={NavMenu === 'usuarios'}
                  >
                    <option value="2">Operador de registro</option>
                    <option value="1">Administrador</option>
                    <option value="3">Coordinador</option>
                  </select>
                  <Briefcase className="absolute right-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Confirmar cambio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInfoModal;