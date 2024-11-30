import ProfilVote from "../Votantes";
import ContentInfo from "../ContentCardRe";
import InfoAsamblea from "../InfoAsambleas";
import { Vote,History } from "lucide-react";
import Grafficas from '../../app/Card_redirect/Grafficas';
import { useParams } from 'react-router-dom';
import  axios  from 'axios';
import { useEffect,useState } from 'react';
import { URI11,URI12,URI2,URI6,URI3,UIR14 } from "../../services/Conexiones";
import Select from '../Select';
import { Skeleton } from "@/components/ui/skeleton"

import Novotes  from '../Novotes'



const MyComponent = () => {
const {id} = useParams();
const [votos, setVotos] = useState([]);
const[UserNovoting, setUserNovoting] = useState([]);
const [Questionsdata, setQuestionsdata] = useState([]);
const [CountUsers , setConterUsers] = useState([]);
const [idPregunta, setidPregunta] = useState('');


const GetVotos = async () => {
   const reesponse = await axios.get(URI11+id);//, params:   id);
   setVotos(reesponse.data);
}
 
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



useEffect(() => {
  GetVotos();
  GetUserNovoting(); 
  getQuestdions();
  GetCounTUsers();
 
}, []);  
console.log("Preguntaspor Id:  ", Questionsdata);

console.log("contador de votos totaldddddddsdddddddddddddddddddd :", CountUsers);

  return ( 
    <div className='h-full w-full  flex  gap-4  '>

<div className='h-full w-[270px] bg-[#F5F5F5] rounded-lg shadow-xl flex flex-col gap-2'>
  {/* Título del contenedor */}
  <div className='h-10 flex justify-center items-center bg-[#F5F5F5] shadow-[0px_5px_11px_-2px_rgba(0,_0,_0,_0.1)] rounded-t-lg'>
    Votaciones
  </div>


  {votos.length>0 ? (
    // Si hay votos, se muestran los componentes ProfilVote
    votos.map((voto) => (
      <ProfilVote
        key={voto.id_voter} // Usamos una clave única para cada voto
        name={voto.usuario.Nombre}
        Cedula={voto.id_voter}
        voto={voto.Voto}
        abreviatura={voto.abreviatura}
        estado={true}
        className="transition-all opacity-0 animate-fadeIn"
      />
    ))
  ) : <Novotes message="No hay votaciones Recientes"></Novotes>}
</div>

     <div class="w-[80%]  grid grid-cols-2 grid-rows-4 gap-3">


                <div className='col-span-1 row-span-1  grid grid-rows-1 grid-cols-2 gap-2 '>

                    <ContentInfo description={"Votos"} data={votos.length}  svg={<Vote/>}></ContentInfo>
                    <ContentInfo description={"Tiempo promedio en responder"} data={"5Min"} svg={<History/>}></ContentInfo>
                   

                </div>


                <div className='col-span-1 row-span-2 '>
            
                    <InfoAsamblea></InfoAsamblea>
                </div>

                <div className='col-span-1 w-full row-span-3 h-full bg-[#F5F5F5] rounded-lg shadow-xl flex flex-col gap-2'>
  {/* Título del contenedor */}
  <div className='h-10 flex justify-center items-center bg-[#F5F5F5] shadow-[0px_5px_11px_-2px_rgba(0,_0,_0,_0.1)] rounded-t-lg mb-2'>
    <p className="">Usuarios Faltantes por votar</p>
     <span className="">{UserNovoting.length}/{CountUsers.count}</span> 

  </div>

  {/* Renderizado condicional */}
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


                <div className='col-span-1 row-span-2 flex h-full w-full bg-[#F5F5F5] rrounded-lg shadow-sm p-2 '>
                    
                    
                    <Grafficas questions={Questionsdata}></Grafficas>
                 
                 
                </div>
        </div> 

</div>
  );
};

export default MyComponent;
