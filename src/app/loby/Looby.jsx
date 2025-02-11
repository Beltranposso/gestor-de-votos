import { useEffect, useState } from 'react';
import './loby.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import io from 'socket.io-client';
import QRCode from 'qrcode'; 
import { URI, URI7,URI8,URI9,URI19, URI18 } from '../../services/Conexiones';
import { Link, Users, Clock, Vote, ArrowLeft } from 'lucide-react';
import Header from '../../components/headerLoby';
import QRsection from '../../components/QRloby';
import Quorum from '../../components/QuorumLoby';
import VotingForm from '../../components/VotingForm';
import QrContent from '../../components/Lobby';
/* import Footer from '../footer/footer'; */
import { useParams,useNavigate } from 'react-router-dom';





 
 const socket = io("http://localhost:8000/"); 
/*  const socket = io('http://localhost:8000');  */
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
  const [estado2, setEstado2] = useState(''); 
  const[Users,setUseres]= useState([]);
  const navigate = useNavigate()
  const [showVotingForm, setShowVotingForm] = useState(false);
  const codify = btoa(id);
  
  




const getAsamblea = async () => {

const response = await axios.get(`${URI19}${id}`);

setTitle(response.data.Title);
setDateTime(response.data.FechaInicio);
setStartTime(response.data.horaInicio);
setEstado2(response.data.Estado);
}



  const generateQRCode = async () => {
    try {

      // Puedes cambiar esta URL por la que deseas generar
  const url = await QRCode.toDataURL(`http://localhost:3157/c/${codify}`);
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
     
      const response = await axios.get(`http://localhost:8000/UsersDefinitive/q/quorum/${id}`, {
          withCredentials: true // Si manejas autenticación con cookies
      });

      // Actualizar el estado con los datos recibidos
      setUserpresentes(response.data.numeroUsuariosPresentes);
      setNumeroUsuarios(response.data.totalUsuariosRegistrados); 
   
      setQuorumTotal(response.data.quorumTotal); 
       console.log(response.data);
 

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
  obtenerQuorum();
 },[])




 




 useEffect(() => {
  const handleSocketEvent = (r) => {
    setseñal(r); // Actualiza el estado 'close' cuando el socket reciba la señal
  };

  // Escuchar evento 'CL' del socket
  socket.on('ASIST', handleSocketEvent);

  // Limpieza para evitar múltiples listeners
  return () => {
    socket.off('ASIST', handleSocketEvent);
  };
}, []); // Se ejecuta al montar, y solo escucha al socket

useEffect(() => {
  // Este efecto depende de 'close' y se ejecuta solo cuando 'close' cambia
  if (señal) {
  getEstado();
  obtenerQuorum();
  getAsamblea();
  }
}, [señal]); // A
 
useEffect(() => {

  socket.on('ASIST', (m) => {   
    setseñal(m);
  });

},[señal]);



  return (
    <div className="min-h-screen bg-white">
    <Header id={id} estado={estado2} onCreateVote={() => setShowVotingForm(true)} />
    
    <div className="flex items-center justify-center h-full  pt-8 ">
      {showVotingForm ? (
        <VotingForm onBack={() => setShowVotingForm(false)} />
      ) : (
        <QrContent
          participants={Userpresentes}          maxParticipants={numeroUsuarios}
        
          quorum={quorumTotal}
        />
      )}
    </div>
  </div>
  );
};

export default Loby;

   /*  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-6xl mx-auto">
      
     <Header startTime={startTime} DateTime={dateTime} assemblyName={Title}  estado={estado2} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QRsection assemblyUrl={''} />
        <Quorum
          attendees={Users}
          totalRequired={numeroUsuarios}
          quorumtoal={quorumTotal} 
        />
      </div>
    </div>
  </div> */
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