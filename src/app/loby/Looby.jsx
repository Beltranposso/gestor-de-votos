import { useEffect, useState } from 'react';
import './loby.css';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import QRCode from 'qrcode';  // Asegúrate de que este import sea el correcto para generar el código QR
/* import Footer from '../footer/footer'; */
import { set } from 'react-hook-form';

const socket = io("http://localhost:8000");

const Loby = () => {
  const [QRurl, setQRurl] = useState('');
  const [Idcard, setIdcard] = useState('');
  const[questions,setQuestions] = useState('');
  const decodedidcard = encodeURIComponent(Idcard)
  const decodedquestion = encodeURIComponent(questions)
  
  const generateQRCode = async () => {
    try {

      // Puedes cambiar esta URL por la que deseas generar
      const url = await QRCode.toDataURL(`http://localhost:5174/formulario/${decodedidcard}/${decodedquestion}`);
      setQRurl(url);
   
    } catch (error) {
      console.error('Error generando el código QR', error);
    }
  };
  
  useEffect(() => {
    generateQRCode();
  }, [Idcard]);
  
  
  
  useEffect(() => {
    // Escuchar el mensaje del servidor solo una vez al montar el componente
    socket.on('enviaridCard', (idCard,question) => {
      setIdcard(idCard);
      setQuestions(question);
    });
    
    // Limpiar el evento cuando el componente se desmonta
    return () => {
      socket.off('recibirTitle');
    };


    
  }, [Idcard]); //
  
  console.log("pregunta: ",decodedquestion)
  
  
 
 
  console.log('idcard', Idcard);
  return (
    <div className="Lobi">
      <div id="contenedorQR" className='Qr_component'>
        {QRurl ? (
          <img className='QR' src={QRurl} alt="Código QR"/>
        ) : (
          <p>Generando código QR...</p>  // Mensaje mientras se genera el QR
        )}
      </div>
      <div>
        {`http://localhost:5174/formulario/${decodedidcard}/${decodedquestion}`}
      </div>
      <Button variant="primary">Iniciar</Button>
     {/*  <Footer /> */}
    </div>
  );
};

export default Loby;
