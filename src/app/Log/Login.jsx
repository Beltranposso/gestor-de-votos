import './Login.css'
import Button from 'react-bootstrap/Button';
/* import Footer from '../footer/footer' */
import { useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Validation = () => {
 const navigate = useNavigate();
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const URI4 = 'http://localhost:8000/login'; // Asegúrate de que esta URI es correcta

  const isSubmit = async (data) => {
    try {
      const response = await axios.post(URI4, {
        Cedula: data.Cedula,
        Contraseña: data.Contraseña
      });
      if (response.data.token) {
        // Almacena el token en localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/Home');
 
      } else {
        alert('Cedula o Contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
    }
  };
  return (
    <div className="validation">
      {/*   <img  className='img_control' src="/src/assets/img/control 360(gestion de votos) (1).png" alt="" width={600} height={300}/> */}
      <div className='img_content'>
        <img src="/src/assets/img/file.png" alt="" width={450} height={200} />
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