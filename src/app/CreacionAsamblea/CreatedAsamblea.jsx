import{ useState,useEffect} from 'react';
import { Clock, Building2, FileText, Type, Calendar } from 'lucide-react';
import {URI} from '../../services/Conexiones'
import {Link,useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import {getRouteByRole}from '../../components/rutes.js'
import { SuccessModal } from '../../components/Modal/SuccessModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';


export default function AssemblyForm() {
  const nav = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cedula,setCeedula] = useState('');
  const[ruta,setRuta] = useState('');
  const [Rute, setRute] = useState('');
  const [formData, setFormData] = useState({
    condominiumName: '',
    title: '',
    startDate: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  useEffect(() => {

    // Realizamos la solicitud al backend para validar el token y obtener el rol
    axios.get('http://localhost:8000/get-user-info', { withCredentials: true })
      .then(response => {
        const { id } = response.data;
         // El backend devuelve el rol del usuari
      
          setCeedula(id);
       
// Comprobamos si el rol está permitido
      })
      .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
        setIsAuthorized(false); // No autorizado si hay un error
      })
      .finally(() => {
        setIsLoading(false); // Terminamos de cargar
      });
  
    }, []);

  
/*   const token = Cookies.get('auth_token');
  const decoded = jwtDecode(token); */

  const uniqueID = uuidv4();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Agregar un estado de carga (opcional)
   

     // Validar los datos del formulario
     if (!formData.condominiumName || !formData.title || !formData.description || !formData.startTime || !formData.endTime || !formData.startDate) {
       alert("Por favor, completa todos los campos antes de enviar.");
       return;
      }
      
      try {
        setIsLoading(true); // Inicia el estado de carga
        
        const response = await axios.post(URI, {
          id: uniqueID,
          UserId: cedula,
          Condominio: formData.condominiumName,
          Title: formData.title,
          Descripcion: formData.description,
          horaInicio: String(formData.startTime),
          horaExpiracion:String(formData.endTime),
          FechaInicio: formData.startDate,
        });
        
        
        // Manejar respuesta exitosa
        if (response.status === 201 || response.status === 200) {
          setIsModalOpen(true);
          setFormData({
            condominiumName: "",
            title: "",
            description: "",
            startTime: "",
            endTime: "",
            startDate: "",
          }); 
        
            
        } else {
            alert("Algo salió mal. Por favor, intenta nuevamente.");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al enviar los datos. Intenta nuevamente más tarde.");
      
      }  
    };
    

    const obtenerRuta = async () => {
      const ruta = await getRouteByRole();
    
      setRuta(ruta);   // Muestra la ruta obtenida en consola
    };
    
    const fun = ()=>{
      window.history.back();
    }
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const goBack = () => {
    nav(-1); // -1 indica que retrocede una página
};



  useEffect(() => {
    obtenerRuta();
  }, []);





  return (
    <div className="h-screen w-full  flex items-center justify-center">

      <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          duration={4000}
          onClick={fun}
          message='Asamblea creada correctamente'
          rute={Rute}
            id={uniqueID}
        
        />
    <div className='w-full  flex  flex-col'>

      <div className='h-5 pl-2'>
      <button
        onClick={goBack}
        className="flex items-center gap-2 px-3 py-1 bg-indigo-600 text-white rounded-lg 
                 hover:bg-indigo-700 transition-colors duration-200 
                 shadow-lg hover:shadow-xl active:scale-95 transform"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Devolver</span>
      </button>
      </div>
      <div className=" w-4/5 h-auto  mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Cree su asamblea </h2>
          <p className="mt-2 text-sm text-gray-600">Complete todos los campos para crear su asamblea</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-2 w-full h-[500px] ">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Building2 className="w-4 h-4" />
              Nombre del Condominio
            </label>
            <input
              type="text"
              name="condominiumName"
              value={formData.condominiumName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Type className="w-4 h-4" />
              Título
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" />
                Fecha de la Asamblea
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4" />
                  Hora de Inicio
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4" />
                  Hora de Finalización
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4" />
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type='submit'
              
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 active:bg-blue-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Crear Asamblea
            </button>
          </div>
        </form>
      </div>

      </div>
    </div>
  );
}