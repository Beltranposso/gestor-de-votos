import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/usuarios/';

function UpdateUser() {
  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [correo, setCorreo] = useState();
  const [cedula, setCedula] = useState();
  const[contraseña,setContraseña]= useState();
 
  const { id } = useParams()
  const navigate= useNavigate()
  const handleSubmit = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
        await axios.put(URI+id,{Nombre:nombre,Apellido:apellido,Correo: correo,Cedula:cedula,})

        navigate('/listUsers')
    }
    setValidated(true);
  };
  const getuserid = async () => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setNombre(response.data.Nombre);
      setApellido(response.data.Apellido);
      setCorreo(response.data.Correo);
      setCedula(response.data.Cedula);
      
;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getuserid(); // Llamar a la función getuserid cuando se monta el componente
  }, []);


  return (
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
        <Form.Control.Feedback type="invalid">
          porfavor ingresa el correo
        </Form.Control.Feedback>
      </Form.Group>
    </Row>
    <Form.Group className="mb-3">
      <Form.Check
        required
        label="Agree to terms and conditions"
        feedback="You must agree before submitting."
        feedbackType="invalid"
      />
    </Form.Group>
    <Button type="submit">Submit form</Button>
  </Form>
  );
}

export default UpdateUser;