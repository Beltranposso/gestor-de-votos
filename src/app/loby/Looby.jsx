import { useEffect, useState } from 'react';
import './loby.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import QRCode from 'qrcode'; 
import { URI, URI7,URI8,URI9,URI19, URI18 } from '../../services/Conexiones';
import Header from '../../components/headerLoby';
import QRsection from '../../components/QRloby';
import Quorum from '../../components/QuorumLoby';
/* import Footer from '../footer/footer'; */
import { useParams,useNavigate } from 'react-router-dom';
import { use } from 'react';





 const socket = io("https://serverapivote.co.control360.co"); 
/* const socket = io('http://localhost:8000/'); */
const Loby = () => {
  const [QRurl, setQRurl] = useState('');
  const [Idcard, setIdcard] = useState('');
  const [questions,setQuestions] = useState('');
  const [estado, setEstado] = useState();
  const {id} = useParams();
  const [link, setLink] = useState('');
  const [Title,setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [señal, setseñal] = useState('');
  const[Users,setUseres]= useState([]);
  const navigate = useNavigate()
  const codify = btoa(id);
  
  




const getAsamblea = async () => {

const response = await axios.get(`${URI19}${id}`);

setTitle(response.data.Title);
setDateTime(response.data.FechaInicio);
setStartTime(response.data.horaInicio);
}



  const generateQRCode = async () => {
    try {

      // Puedes cambiar esta URL por la que deseas generar
  const url = await QRCode.toDataURL(`https://control360.co/c/${codify}`);
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
    getAsamblea();
   
  getlink();
    
  }, []); //


 


  const [quorumTotal, setQuorumTotal] = useState(null);
  const [numeroUsuarios, setNumeroUsuarios] = useState(null);
  const [Userpresentes, setUserpresentes] = useState(null);
  const [error, setError] = useState(null);
  
  
const obtenerQuorum = async () => {
  try {
     
      const response = await axios.get(`https://serverapivote.co.control360.co/UsersDefinitive/q/quorum/${id}`, {
          withCredentials: true // Si manejas autenticación con cookies
      });

      // Actualizar el estado con los datos recibidos
      setQuorumTotal(response.data.quorumTotal); 
      setUserpresentes(response.data.numeroUsuariosPresentes);
      setNumeroUsuarios(response.data.totalUsuariosRegistrados); 
       setUseres(response.data.usuariosPresentes); 
     

      setError(null);
  } catch (err) {
      console.error('Error al obtener el quorum:', err);
      setError(err.response?.data?.message || 'Error al cargar los datos');
  } finally {
      // Finalmente, limpiar el error
      setError(null);
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
  getAsamblea();

 },[])




 
useEffect(() => {
  socket.on("ASIST", (señal ) => {
   
    setseñal(señal);
  });
  getEstado();
  obtenerQuorum();
}, [señal])
 


  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">
      
     <Header startTime={startTime} DateTime={dateTime} assemblyName={Title}  />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QRsection assemblyUrl={''} />
        <Quorum
          attendees={Users}
          totalRequired={numeroUsuarios}
          quorumtoal={quorumTotal} 
        />
      </div>
    </div>
  </div>

  );
};

export default Loby;

/*  <div className="Lobi">
    
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
  
 </div> */