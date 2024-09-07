import { useEffect, useState } from 'react';
import './loby.css';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import QRCode from 'qrcode';
import Footer from '../footer/footer'
/* const socket = io("http://localhost:8000"); */

const Loby = () => {
  const [QRurl, setQRurl] = useState('');

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL('https://www.google.com/?hl=es');
      setQRurl(url);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    generateQRCode();
  }, []);


  const id  = ()  => {
   let id  = Math.random().toString(30).substring(2)
   return id 
  }



  return (
    <div className="Lobi">
      <div></div>
      <div id="contenedorQR" className='Qr_component'>
        {QRurl && (
         
            <img className='QR' src={QRurl} alt="Código QR" />
         
        )}
      </div>
      <Button  variant="primary">Iniciar</Button>

     <Footer></Footer>
    </div>
  );
};

export default Loby;
