import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { URI5 ,URI18} from '../services/Conexiones';
import { SuccessModal } from './Modal/SuccessModal';


function Create_User() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [validated, setValidated] = useState(false);
  const [cargo, setCargo] = useState(0);
  const [poder, setPoder] = useState(0);
  const[contraseña,setContraseña]= useState('');
  const [Apto, setApto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if(cargo===4){

        await axios.post(URI18, { Nombre: nombre, Apellido: apellido, Correo: correo, Cedula: cedula, id_cargo:cargo,quorum:poder ,Apto: A});
      }else{        
        await axios.post(URI5, );
      }

      navigate('listUsers');
    } 
    setValidated(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };
  
  
  const manejarCambio = (label) => {
    // Guardar el label seleccionado en el estado
    setCargo(label);  

    // Mostrar el valor directamente
   
  }; 

  return (
    <div className='flex justify-center   items-center  w-full h-full'>
       <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          duration={4000}
        />
         <button
          onClick={handleShowModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        ></button>
     <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>C.C</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Ingresa tu documento"
              aria-describedby="inputGroupPrepend"
              required
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
          <Form.Label>Tipo de Usuario</Form.Label>
          <Form.Select 
  aria-label="Default select example" 
  onChange={(e) => manejarCambio(e.target.value)} // Pasar el valor seleccionado
  defaultValue=""
>
  <option value="" disabled>Seleccione el tipo de usuario</option>
  <option value={1}>Administrador</option>
  <option value={3}>Coordinador</option>
  <option value={2}>Operador de registro</option>
  <option value={4}>Usuario</option>
</Form.Select>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Correo"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
      
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
          disabled={cargo == 4 ? true : false}
            required
            type="text"
            placeholder="contraseña"
            value={contraseña || ''}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom03">
   
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.Label>P.Aquisitivo</Form.Label>
          <Form.Control
  type="number"
  placeholder="P.Aquisitivo"
  step="0.0001" // Esto permite ingresar valores con decimales
  required
  value={poder} // Asegúrate de que `poder` esté definido como estado
  onChange={(e) => setPoder(parseFloat(e.target.value) )} // Guarda como decimal
/>
        
        
        </Form.Group>
        
      </Row>
      <Form.Group className="mb-3">
      <Form.Label>Apartamento o residencia</Form.Label>
          <Form.Control
  type="text"
  placeholder=""
  step="0.001" // Esto permite ingresar valores con decimales
  required
  value={Apto} // Asegúrate de que `poder` esté definido como estado
  onChange={(e) => setApto(e.target.value )} // Guarda como decimal
/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Crear</Button>
    </Form> 
    </div>
  );
}

export default Create_User;