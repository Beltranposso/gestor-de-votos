import { useEffect, useState } from 'react';
import './loby.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import QRCode from 'qrcode'; 

import { URI, URI7,URI8,URI9 } from '../../services/Conexiones';

/* import Footer from '../footer/footer'; */
import { set } from 'react-hook-form';
import { useParams,useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
const socket = io("https://serverapivote.co.control360.co");

const Loby = () => {
  const [QRurl, setQRurl] = useState('');
  const [Idcard, setIdcard] = useState('');
  const[questions,setQuestions] = useState('');
  const[estado, setEstado] = useState();
  const {id} = useParams();

  const [link, setLink] = useState('');
  const navigate = useNavigate()

  const generateQRCode = async () => {
    try {

      // Puedes cambiar esta URL por la que deseas generar
  const url = await QRCode.toDataURL(`https://control360.co/c/${id}`);
      setQRurl(url);
   
    } catch (error) {
      console.error('Error generando el código QR', error);
    }
  };


  const getlink = async () => {
    try {
      const response = await axios.get(`${URI7}${id}`);
      setLink(response.data.link);
    } catch (error) {
      console.error('Error al obtener el enlace:', error);
    }
  };
  
  useEffect(() => {
    generateQRCode();
  
  }, [Idcard]);
  
  
  
  useEffect(() => {
    // Escuchar el mensaje del servidor solo una vez al montar el componente
   
  getlink();
    
  }, []); //
  console.log("link de la votacion: ",link)

  const Iniciar = async () => {
  // Cambia el estado
    setEstado(true); 
    const Es = estado ? 'Activa' : 'Activa'; 
   
    try {
      await axios.post(URI8, {id:id, Estado: Es });
      // Emitir el cambio usando socket.io si es necesario
      socket.emit('iniciar', Es);
       navigate(`/Home/Cardinfo/${id}`); 

      
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };







 const getEstado = async () => {
  try {
    const response = await axios.get(`${URI9}${id}`);
    setEstado(response.data);
  } catch (error) {
    console.error('Error al obtener el enlace:', error);
  }
 }


 useEffect(() => {
  getEstado();
 },[])



  console.log("VERIFICAR ESTADO DEL GET ",estado)
  return (
    <div className="Lobi">
       
      <div id="contenedorQR" className='Qr_component'>
        {QRurl ? (
          <img className='QR' src={QRurl} alt="Código QR"/>
        ) : (
          <p>Generando código QR...</p>  
        )}
      </div>
      <div>
        {link}
      </div>
      
      <Button   disabled={estado==='Activa'?true:false}   onClick={Iniciar} variant="primary">{estado==='notestate'?'Iniciar Votacion':'Votacion en curso'}</Button>
     
    </div>
  );
};

export default Loby;
