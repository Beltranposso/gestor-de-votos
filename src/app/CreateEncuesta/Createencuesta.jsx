import React, { useState, useEffect } from 'react';
import { Proposal } from './Proposal';
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import { SuccessModal } from '../../components/Modal/SuccessModal';
import axios from 'axios';
import Questionfinalized from '../../components/QuestionsFinalized';
import ModalAvertencia from '../../components/Modal/AdvertenciModal';
import { URI24, URI19 } from '../../services/Conexiones';
import io from 'socket.io-client';


const Sokect = io('http://localhost:8000/', {
  reconnection: true,            // Habilita la reconexión automática
  reconnectionAttempts: 10,      // Número máximo de intentos de reconexión (puedes ajustarlo)
  reconnectionDelay: 1000,       // Tiempo inicial entre intentos en milisegundos
  reconnectionDelayMax: 5000,    // Tiempo máximo entre intentos de reconexión
  timeout: 20000                 // Tiempo máximo para intentar conectar antes de dar timeout
});
export default function VotingForm({ onBack ,onClick}) {
  const [description, setDescription] = useState('');
  const [communityType, setCommunityType] = useState('apartments');
  const [duration, setDuration] = useState('0');
  const [durationType, setDurationType] = useState('minutes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [estado, setestado] = useState('');
  const [segundos, setSegundos] = useState(0);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [Time,setTime ]= useState('');
  useEffect(() => {
    if (durationType === 'minutes') {
      setSegundos(parseInt(duration) * 60);
    } else if (durationType === 'seconds') {
      setSegundos(parseInt(duration));
    }
  }, [duration, durationType]);

  const [proposals, setProposals] = useState([
    {
      id: Date.now().toString(30),
      id_card: id,
      title: '',
      options: ["", ""],
    },
  ]);

  const addProposal = () => {
    const newProposal = {
      id: Date.now().toString(30),
      id_card: id,
      title: '',
      options: ["", ""],
    };
    setProposals([...proposals, newProposal]);
  };

  const updateProposal = (id, updatedProposal) => {
    setProposals(proposals.map(p => p.id === id ? updatedProposal : p));
  };

  const deleteProposal = (id) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!duration || parseInt(duration) <= 0) {
      newErrors.duration = "La duración es obligatoria y debe ser mayor a 0.";
    }
    proposals.forEach((proposal, index) => {
      if (!proposal.title) {
        newErrors[`proposalTitle_${index}`] = "El título de la propuesta es obligatorio.";
      }
      proposal.options.forEach((option, optionIndex) => {
        if (!option) {
          newErrors[`proposalOption_${index}_${optionIndex}`] = `La opción ${optionIndex + 1} de la propuesta es obligatoria.`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    const tiempoInicio = new Date().toLocaleString();
    try {
      const dataToSend = {
        id_card: id,
        preguntas: proposals.map((proposal) => ({
          id: proposal.id,
          id_card: proposal.id_card,
          title: proposal.title,
          options: proposal.options,
        })),
        Duracion: segundos,
        tiempoInicio
      };

      const response = await axios.post(URI24, dataToSend);

      if (response.status === 201) {
        localStorage.setItem('preguntaId', proposals[0].id);
      
        Sokect.emit('Dataidpregunta', "data: "+  proposals[0].id);
        
      }
      
      
      
      if(response.status === 210){
        setIsModalOpen2(true);
      }
      
      

    } catch (error) {
      console.error('Error al enviar las propuestas:', error);
    }
  };

  const getCardInfo = async () => {
    const response = await axios.get(`${URI19}${id}`);
    setestado(response.data.Estado);
  };

  useEffect(() => {
    getCardInfo();
  }, []);


  const setdepure = () => {
    if (Sokect && Sokect.connected) {
      if (proposals.length > 0 && proposals[0].id) {
        Sokect.emit('Dataidpregunta', { idPregunta: proposals[0].id });
    
      } else {
        console.error('La propuesta no contiene un ID válido.');
      }
    } else {
      console.error('El socket no está conectado.');
    }
  };


  useEffect(() => {
    // URL del servidor

     // Enviar el ID de la pregunta al servidor
     Sokect.emit('startCronometro', localStorage.getItem('preguntaId'));

     // Escuchar actualizaciones del cronómetro
     Sokect.on('cronometro', (data) => {
         setTime(data.tiempoRestante);
       

         // Si el cronómetro ha terminado, desconectar
        
     });

     // Manejar errores
     Sokect.on('error', (errorMessage) => {
         console.error('Error del servidor:', errorMessage);
     });

     // Limpiar conexión al desmontar el componente
  
 }, [localStorage.getItem('preguntaId')]);


  return (
    <div className='w-full h-full flex flex-col'>
      {estado === "Finalizada" ? (
        <Questionfinalized />
      ) : (
        <>

         

          <div className='w-full h-full overflow-y-auto'>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 bg-blue-600 text-white p-3 -mx-6 -mt-6 rounded-t-lg">
                  Votación de la Comunidad
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2">Duración de la Votación:</label>
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        min="1"
                        className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      {errors.duration && <p className="text-red-500">{errors.duration}</p>}
                      <select
                        className="flex-1 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={durationType}
                        onChange={(e) => setDurationType(e.target.value)}
                      >
                        <option value="minutes">Minutos</option>
                        <option value="seconds">Segundos</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {proposals.map((proposal, index) => (
                <Proposal
                  key={proposal.id}
                  proposal={proposal}
                  onUpdate={(updatedProposal) => updateProposal(proposal.id, updatedProposal)}
                  onDelete={() => deleteProposal(proposal.id)}
                  errors={errors}
                  index={index}
                />
              ))}

            </div>
<div className='w-full  mt-10 px-10 '>
            <Button className='w-full' onClick={async() => {await handleSave(); await onClick()}}>LANZAR VOTACIÓN</Button>
          </div>
           
          </div>

      
        </>
      )}
    </div>
  );
}
