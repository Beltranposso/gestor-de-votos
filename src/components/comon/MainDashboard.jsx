import ProfilVote from "../Votantes";
import ContentInfo from "../ContentCardRe";
import InfoAsamblea from "../InfoAsambleas";
import { Vote,History, Type } from "lucide-react";
import Grafficas from '../../app/Card_redirect/Grafficas';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect,useState } from 'react';
import { URI11,URI12,URI2,URI6,URI3,UIR14,URI19,URI25 } from "../../services/Conexiones";
import Select from '../Select';
import { Skeleton } from "@/components/ui/skeleton"
import  io  from "socket.io-client";

import Novotes  from '../Novotes'
import { set } from "react-hook-form";


/* const Socket = io('http://localhost:8000'); */
const Socket = io('https://serverapivote.co.control360.co');

const MyComponent = () => {
const {id} = useParams();
const [votos, setVotos] = useState([]);
const[UserNovoting, setUserNovoting] = useState([]);
const [Questionsdata, setQuestionsdata] = useState([]);
const [CountUsers , setConterUsers] = useState([]);
const [idPregunta, setidPregunta] = useState('');
const [Fecha, setFecha] = useState('0000-00-00');
const [timeRemaining, setTimeRemaining] = useState({});
const [CreacionDate,setCreacionDate] = useState('');
const [Condominio,setCondominio] = useState('');
const[Descripcion, setDescripcion] = useState('');
const[HoraInicio, setHoraInicio] = useState('');
const [estado, setestado] = useState('');
const[señal,setsenal] = useState('');



const getfechaIncial = async () => {
 const response = await axios.get(URI19+id);
 setFecha(response.data.FechaInicio);
 setCreacionDate(response.data.createdAt);
 setCondominio(response.data.Condominio);
 setDescripcion(response.data.Descripcion);
 setHoraInicio(response.data.horaInicio);
 setestado(response.data.Estado);

}



const GetVotos = async () => {
   const reesponse = await axios.get(URI11+id);//, params:   id);
   setVotos(reesponse.data);
}
console.log("votossssssssssssssssssssss",votos)
 
 const GetUserNovoting = async () => {
    const response = await axios.get(URI12+id);
    setUserNovoting(response.data);//, params:   id);
} 


const getQuestdions = async () => {
  const response = await axios.get(URI2+id);//, params:   id);
  setQuestionsdata(response.data);
  setidPregunta(response.data.id);
};

const GetCounTUsers = async () => {
  const response = await axios.get(UIR14);//, params:   id);
 setConterUsers(response.data);
}

console.log(HoraInicio)

const [timeLeft, setTimeLeft] = useState("");
useEffect(() => {
  // Crear fecha de expiración combinando CreacionDate y HoraInicio
  const [year, month, day] = Fecha.split("-").map(Number);
  const [hours, minutes] = HoraInicio.split(":").map(Number);
  const expiration = new Date(year, month - 1, day, hours, minutes, 0); // Combinación de fecha y hora
  console.log("Fecha de expiración:", expiration);

  // Verificar que la fecha de expiración sea válida
  if (isNaN(expiration.getTime())) {
    setTimeLeft("Formato de fecha u hora inválido. Use 'YYYY-MM-DD' para fecha y 'HH:mm' para hora.");
    return;
  }

  // Función para calcular el tiempo restante
  const updateCountdown = () => {
    const now = new Date(); // Fecha y hora actual
    console.log("Fecha actual:", now);

    const diff = expiration - now; // Diferencia en milisegundos

    // Verificar si ya pasó la fecha de expiración
    if (diff <= 0) {
      setTimeLeft("¡El tiempo ya pasó!");
      clearInterval(timer); // Detener el contador si la fecha ya pasó
      return;
    }

    // Calcular días, horas, minutos y segundos restantes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);

    // Actualizar el estado con el tiempo restante
    setTimeLeft(`${days}d ${hoursRemaining}h ${minutesRemaining}m ${secondsRemaining}s`);
  };

  // Configurar el intervalo para actualizar cada segundo
  const timer = setInterval(updateCountdown, 1000);
  updateCountdown(); // Ejecutar inmediatamente

  // Limpiar el intervalo al desmontar el componente
  return () => clearInterval(timer);
}, [CreacionDate, HoraInicio]);




useEffect(() => {
  Socket.on('M', (data) => {
   setsenal(data);
  })



  GetVotos();
  GetUserNovoting(); 
  getQuestdions();
  GetCounTUsers();
  getfechaIncial();
 
}, [señal]); 



  return ( 
    <div className='h-full w-full  flex  gap-4  '>

<div className='h-full w-[270px] bg-[#F5F5F5] rounded-lg shadow-xl flex flex-col gap-2 overflow-x-hidden'>
  {/* Título del contenedor */}
  <div className='h-10 flex sticky top-0 justify-center items-center bg-[#F5F5F5] shadow-[0px_5px_11px_-2px_rgba(0,_0,_0,_0.1)] rounded-t-lg'>
    Votaciones
  </div>

    {votos.length>0 ? (
    // Si hay votos, se muestran los componentes ProfilVote
    votos.map((voto) => (
      <ProfilVote
        key={voto.id_voter} // Usamos una clave única para cada voto
        name={voto.usuarios[0].Nombre}
        Cedula={voto.id_voter}
        voto={voto.Voto}
        abreviatura={voto.abreviatura}
        estado={true}
        className="transition-all opacity-0 animate-fadeIn"
      />
    ))
  ) : <Novotes message="No hay votaciones Recientes"></Novotes>}    
     
</div>

     <div class="w-[80%] grid grid-cols-2 grid-rows-4 gap-3">


                <div className='col-span-1 row-span-1  grid grid-rows-1 grid-cols-2 gap-2 '>

                    <ContentInfo description={"Votos"} data={votos.length}  svg={<Vote/>}></ContentInfo>
                    <ContentInfo description={"Tiempo Para que empieze la Asamblea"} data={estado==="Programada" ? timeLeft :estado==="Activa" ?"Activa":" finalizada" } svg={<History/>}></ContentInfo>
                   

                </div>


                <div className='col-span-1 row-span-2 shadow-sm bg-[#F5F5F5] rounded-lg'>
            
                    <InfoAsamblea Fecha={Fecha} Condominio={Condominio} Descripcion={Descripcion}></InfoAsamblea>
                </div>

                <div className='col-span-1 w-full row-span-3 h-full bg-[#F5F5F5] rounded-lg shadow-xl flex flex-col gap-2'>
  {/* Título del contenedor */}
  <div className='h-10 flex justify-center items-center bg-[#F5F5F5] shadow-[0px_5px_11px_-2px_rgba(0,_0,_0,_0.1)] rounded-t-lg mb-2'>
    <p className="">Usuarios Faltantes por votar</p>
     <span className="">{UserNovoting.length}/{CountUsers.count}</span> 

  </div>
  <div className="flex flex-col h-full gap-2 overflow-y-auto">
  {UserNovoting.length > 0 ? (
    UserNovoting.map((voto) => (
      <ProfilVote
        key={voto.Cedula}
        name={voto.Nombre}
        Cedula={voto.Cedula}
        voto={voto.Voto}
        abreviatura={"CN"}
        estado={false}
      />
    ))
  ) : <Novotes message={"La asamblea no ha iniciado"}></Novotes>}
  </div>
</div>


                <div className='col-span-1 row-span-2 flex h-full w-full bg-[#F5F5F5] rrounded-lg shadow-xl  p-2 '>
                    
                    
                    {Questionsdata.length>0 ? <Grafficas señal={señal} id={id} questions={Questionsdata}></Grafficas>:<Novotes message={"No hay preguntas para votar"}></Novotes>}
                 
                 
                </div>
        </div> 

</div>
  );
};

export default MyComponent;
