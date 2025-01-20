import React, { useState ,useEffect } from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Timer from './Timer';
import axios from 'axios';
import { use } from 'react';
import Pies from '../app//Card_redirect/PiesChart'
import io from 'socket.io-client';




const URL = 'http://localhost:8000/idCard/';
const socket = io('http://localhost:8000/', {
    reconnection: true,             // Habilita la reconexión automática
});
export const VotingForm = ({ onBack,id }) => {
  const [isVotingEnded, setIsVotingEnded] = useState(false);
  const [preguntaId, setPreguntaId] = useState();
  const [pregunta, setPregunta] = useState('');
  const [Votos, setVotos] = useState([]);
  const [opciones, setOpciones] = useState([]);
const [tiempoRestante, setTiempoRestante] = useState(0);
const [terminado, setTerminado] = useState(false);
const[estado, setestado] = useState(false);


  const handleEndVoting = () => {
    setIsVotingEnded(true);
    // Aquí puedes agregar la lógica para manejar el fin de la votación
  };

  const handleTimeEnd = () => {
    handleEndVoting();
  };

   const GetId = async () => {
      const response = await axios.get(URL + id);
    setPregunta(response.data.preguntas[0].Pregunta);
      setPreguntaId(response.data.preguntas[0].id);
   
   };



useEffect(() => {
  GetId();
}, []);
console.log(preguntaId);

const Getresult = async () => {
  try {
    
    const reponse = await axios.get('http://localhost:8000/votes/Results/Question/'+ id + '/' + preguntaId);
  console.log(reponse.data);
  setVotos(reponse.data.Votos);
  setOpciones(reponse.data.opciones);
  
  } catch (error) {
    
  }
}
console.log("dkdkjdkdkkdkd",preguntaId)
const ClosetQuestion = async () => {

    try {
       const response = await axios.put('http://localhost:8000/questions/Finalized/question/' + preguntaId);

       if (response.status === 200) {
    
        socket.emit('CerrarPregunta',"pregunta:",preguntaId);
        setIsVotingEnded(true);

       }

    }catch (error) {
        console.error( error);
    }
}




useEffect(() => {
    // URL del servidor

     // Enviar el ID de la pregunta al servidor
     socket.emit('startCronometro', preguntaId);

     // Escuchar actualizaciones del cronómetro
     socket.on('cronometro', (data) => {
         setTiempoRestante(data.tiempoRestante);
         setTerminado(data.terminado);

         // Si el cronómetro ha termi ado, desconectar
         if (data.terminado) {
           
        
         }
     });

     // Manejar errores
     socket.on('error', (errorMessage) => {
         console.error('Error del servidor:', errorMessage);
     });

   
  
 }, [preguntaId]);


  return (

    <div>

        {/* Sección de la Pregunta */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
         {pregunta}
              </h2>
             
            </div>
            <div className="flex flex-col items-end gap-4">
              <Timer Time={tiempoRestante} />
              {isVotingEnded? <button
                onClick={async() => {
                 await Getresult();
                   setestado(true);
                }}
             
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-sky-400  hover:bg-blue-200 `}
                 
              >
                Ver resultados
              </button>: <button
                onClick={ClosetQuestion}
             
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isVotingEnded
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Finalizar Votación
              </button>}
            </div>
          </div>
        </div>

        {/* Mensaje de Votación Finalizada */}
        {estado && (
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Resultados de la Votación</h3>
            <div className="h-[300px]">
                <Pies value={Votos} options={opciones} ></Pies>
            </div>
          </div>
        )}

</div>
  );
};




export default VotingForm; 