import React ,{useEffect, useState}from 'react';
import { ArrowLeft, IdCard } from 'lucide-react';
import CreateVotacion from '../app/CreateEncuesta/Createencuesta'
import { use } from 'react';
import VotePregunta from '../components/ContentPreguntaVotacionLoby'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ButttonReloading from '../components/ButtunRefresh'
export const VotingForm= ({ onBack }) => {

  const URL = 'http://localhost:8000/idCard/';
  const[señal2, setseñal2]=useState()
  const [idcard, setIdcard] = useState({
    preguntas: []
 });
  const {id}= useParams();


console.log(id)


useEffect(() => {
  document.body.classList.add('bg-gray-100');
  return () => {
    document.body.classList.remove('bg-gray-100');
  };
}, []);


const GetId = async () => {
 
  const response = await axios.get(URL + id);
    
  setIdcard(response.data);
  
};

useEffect(() => {
  GetId();
}, []);


useEffect(() => {
  GetId();
}, [señal2]);


const señal =  () => {
  GetId();

};
const h = () =>{
 setIdcard({preguntas:[]})
}

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full space-y-8 border border-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Formulario para crear votación</h1>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <ButttonReloading onClick={h} ></ButttonReloading>
      </div>
      <div className="space-y-6">

    {idcard.preguntas.length === 0?<CreateVotacion onClick={señal}/>: <VotePregunta  id={id} />}
        
      </div>
    </div>
  );
};

export default VotingForm;