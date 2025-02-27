import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock, Hash, Home, Percent, UserCircle } from 'lucide-react'
import axios from 'axios'
import { URI18, URI5 } from '../services/Conexiones'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { SuccessModal } from './Modal/SuccessModal'
import WarningMo from './Modal/AdvertenciModal'


export default function FormularioRegistro() {
    const navigate = useNavigate()
    const { id } = useParams();
   
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    cedula: 0,
    residencia: '',
    quorum: 0,
    tipoUsuario: 0
  })

  const [disableResidenciaQuorum, setDisableResidenciaQuorum] = useState(false)
  const [disableContrasena, setDisableContrasena] = useState(false)
  const [value,setValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [AdvertenciModal,setAdvertenciModal] = useState(false);
  useEffect(() => {
    setDisableResidenciaQuorum([1, 2, 3].includes(formData.tipoUsuario))
    setDisableContrasena(formData.tipoUsuario === 4)
  }, [formData.tipoUsuario])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      tipoUsuario: parseInt(value, 10) // Convertir a entero
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Validar tipoUsuario
        const isTipoUsuarioValido = [1, 2, 3].includes(formData.tipoUsuario);

        // Validación adicional para asegurar que tipoUsuario es válido
        if (!isTipoUsuarioValido && !formData.tipoUsuario) {
            console.error("Error: tipoUsuario no es válido.");
            return;
        }

        // Datos comunes para ambas solicitudes
        const payload = {
            Nombre: formData.nombre,
            Apellido: formData.apellido,
            Correo: formData.correo,
            Cedula: parseInt(formData.cedula),
            cargo: formData.tipoUsuario,
            Contraseña: formData.contrasena,
            id_card: id,
        };

        // Seleccionar URI y añadir campos específicos
        let URI = isTipoUsuarioValido ? URI5 : URI18;
        if (!isTipoUsuarioValido) {
            payload.quorum = formData.quorum;
            payload.Apto = formData.residencia;
        }

        // Realizar la solicitud
        const response = await axios.post(URI, payload);

        // Manejo de respuestas específicas
        if (response.status === 250) {
         
          setAdvertenciModal(true);
       
        } else if (response.status >= 200 && response.status < 300) {
            setIsModalOpen(true); // Mostrar modal de éxito
        } else {
            console.error("Error en la solicitud:", response.data);
        }
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            console.error("Error en la solicitud:", error.response.data);
        } else {
            console.error("Error desconocido:", error);
        }
    }
};



  function setvalu() {
    if (formData.tipoUsuario === '1') {
      setValue('Administrador')
    } else if (formData.tipoUsuario === '2') {
      setValue('Operador de registro')
    } else if (formData.tipoUsuario === '3') {
      setValue('Coordinador')
    } else if (formData.tipoUsuario === '4') {
      setValue('Usuario')
    }    
}



const handleShowModal = () => {
  setIsModalOpen(true);
};


  return (
    <div className="w-full max-w-3xl mx-auto h-[480px]">
  
<SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          duration={4000}
          id={id}
        />
         <WarningMo
          isOpen={AdvertenciModal}
          onClose={() => setAdvertenciModal(false)}
          duration={4000}
        />
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Registro de Usuario</CardTitle>
      </CardHeader>
      <CardContent className="py-1">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="tipoUsuario" className="text-sm font-medium">Tipo de Usuario</Label>
            <div className="relative">
              <UserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Select onValueChange={handleSelectChange}  value={formData.tipoUsuario}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Seleccione el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Administrador</SelectItem>
                  <SelectItem value="2">Operador de registro</SelectItem>
                  <SelectItem value="3">Coordinador</SelectItem>
                  <SelectItem value="4">Usuario</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="nombre" className="text-sm font-medium">Nombre</Label>
              <div className="relative">
               
                <Input placeholder="Nombre" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required className="pl-10" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="apellido" className="text-sm font-medium">Apellido</Label>
              <div className="relative ">
              
                <Input placeholder="Apellido"   name="apellido" value={formData.apellido} onChange={handleInputChange} required className="pl-10"  />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="correo" className="text-sm font-medium">Correo</Label>
              <div className="relative">
      
                <Input placeholder="Correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required className="pl-80" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="contrasena" className="text-sm font-medium">Contraseña</Label>
              <div className="relative">
                
                <Input placeholder="***********" name="contrasena" type="password" value={formData.contrasena} onChange={handleInputChange} disabled={disableContrasena} required={!disableContrasena} className="|pl-20" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="cedula" className="text-sm font-medium">Cédula</Label>
              <div className="relative">
          
                <Input  placeholder="Cedula" name="cedula" type="number"  value={formData.cedula} onChange={handleInputChange} required className="" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="residencia" className="text-sm font-medium">Residencia</Label>
              <div className="relative">
            
                <Input placeholder="Residencia"  name="residencia" value={formData.residencia} onChange={handleInputChange} disabled={disableResidenciaQuorum} required={!disableResidenciaQuorum} className="pl-10" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="quorum" className="text-sm font-medium">Coeficiente</Label>
              <div className="relative">
               
                <Input 
                  
                  name="quorum" 
                  type="number" 
                  step="0.01" 
                  value={formData.quorum} 
                  onChange={handleInputChange} 
                  disabled={disableResidenciaQuorum} 
                  required={!disableResidenciaQuorum} 
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">Registrar</Button>
        </form>
      </CardContent>
    </div>
  )
}
