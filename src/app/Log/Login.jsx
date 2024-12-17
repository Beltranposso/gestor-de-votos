import './Login.css'
import Button from 'react-bootstrap/Button';
/* import Footer from '../footer/footer' */
import { useForm} from "react-hook-form"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/img/file.png';
import ModalError from '../../components/Modal/ModalErrorLog'
import ModalSucess from '../../components/Modal/SucessUserLog'
import { jwtDecode } from "jwt-decode"
import { URI21 } from '../../services/Conexiones';
 

const Validation = () => {

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
 /*  const URI4 = 'https://serverapivote.co.control360.co/login'; */ // Asegúrate de que esta URI es correcta
  const URI4 = 'https://serverapivote.co.control360.co/login'; 

// Asegúrate de instalar js-cookie con `npm install js-cookie`
const isSubmit = async (data) => {
  try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await axios.post(
          URI4,
          {
              Cedula: parseInt(data.Cedula),
              Contraseña: data.Contraseña,
          },
          {
              withCredentials: true, // Permitir envío de cookies al backend
          }
      );

      if (response.status === 200) {
          const { usuario } = response.data; // Extraer datos del usuario de la respuesta

          // Determinar la ruta según el cargo del usuario
          let ruta;
          switch (usuario.Cargo) {
              case 'Administrador':
                  ruta = '/Admin/AsambleaControl';
                  break;
              case 'Operador de registro':
                  ruta = '/operator/AsambleaControl';
                  break;
              case 'Coordinador':
                  ruta = '/coordi/AsambleaControl';
                  break;
              default:
                  throw new Error('Cargo no reconocido'); // Manejo de cargos no válidos
          }

          // Redirigir a la ruta correspondiente
          window.location.href = ruta;

        
          setShowSuccess(true); // Mostrar mensaje de éxito
      }
  } catch (error) {
      // Manejo de errores
      if (error.response) {
          const { status } = error.response;

          if (status === 401) {
              setShowError(true); // Mostrar error de credenciales incorrectas
          } else if (status === 500) {
              alert(
                  'Error en el servidor. Por favor, intenta de nuevo más tarde y comunica el problema al asesor.'
              );
          } else {
              console.error('Error desconocido:', error.response.data);
              alert('Ocurrió un error inesperado. Por favor, inténtalo más tarde.');
          }
      } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
          alert('El servidor no está respondiendo. Por favor, verifica tu conexión.');
      } else {
          console.error('Error al configurar la solicitud:', error.message);
          alert('Ocurrió un error al intentar enviar los datos.');
      }
  }
};




  

  return (
    <div className="validation">

< ModalError
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Contraseña o Cedula Incorrecta"
        message="Por favor vuelva a  Verificar los campos ingresados"
      />
        <ModalSucess
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Datos Validados"
        message="Se a loguado Correctamente"
      />
      {/*   <img  className='img_control' src="/src/assets/img/control 360(gestion de votos) (1).png" alt="" width={600} height={300}/> */}
      <div className='img_content'>
        <img src={img} width={450} height={200} />
      </div>
      <div className='formValidation'>
        <form className='form' onSubmit={handleSubmit(isSubmit)}>
          <div className="input-container">
            <input 
            type="text" 

             {...register("Cedula", { required: true })} 
            placeholder='Cedula:' />

            {errors.Cedula && <span>Campo Obligatorio</span>}
          </div>

          <div className="input-container_2">
            <input
             type="password"
            
             placeholder='Contraseña:' 
             {...register("Contraseña", { required: true })}
             />


             {errors.Contraseña&& <span>campo Obligatorio</span>}
          </div>
          <div className='cotenedor_buton'>

            <Button  type='submit' className='buton'>Iniciar</Button>
          </div>
        </form>
      </div>

{/*       <Footer></Footer> */}
    </div>
  );
};


export default Validation;