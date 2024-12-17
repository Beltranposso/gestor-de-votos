import React, { useState,useEffect } from 'react';
import { Proposal } from './Proposal';
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';
import { SuccessModal } from '../../components/Modal/SuccessModal';
import axios from 'axios';
import Questionfinalized from '../../components/QuestionsFinalized'
import { URI24 } from '../../services/Conexiones';
         
export default function VotingForm() {
  const [description, setDescription] = useState('');
  const [communityType, setCommunityType] = useState('apartments');
  const [duration, setDuration] = useState('5');
  const [durationType, setDurationType] = useState('minutes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estado,setestado] = useState('');
  const { id } = useParams();

  const [proposals, setProposals] = useState([
    {
      id: Date.now().toString(30),
      id_card: id,
      title: '',
      options: ["", ""],
    },
  ]);

  // Función para añadir una nueva propuesta
  const addProposal = () => {
    const newProposal = {
      id: Date.now().toString(30),
      id_card: id,
      title: '',
      options: ["", ""],
    };
    setProposals([...proposals, newProposal]);
  };

  // Función para actualizar una propuesta existente
  const updateProposal = (id, updatedProposal) => {
    setProposals(proposals.map(p => p.id === id ? updatedProposal : p));
  };

  // Función para eliminar una propuesta
  const deleteProposal = (id) => {
    setProposals(proposals.filter(p => p.id !== id));
  };

  // Función para manejar el envío de las propuestas
  const handleSave = async () => {
    try {
      // Preparar los datos para enviar al backend
      const dataToSend = {
        id_card: id,
        preguntas: proposals.map((proposal) => ({
          id: proposal.id,
          id_card: proposal.id_card,
          title: proposal.title,
          options: proposal.options,
        })),
      };
  
      // Enviar los datos al backend usando axios
      const response = await axios.post(URI24, dataToSend);
    
  
      // Mostrar modal de éxito
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al enviar las propuestas:', error);
    
    }
  };




 const fetchQuestions = async () => {
  try {
      const response = await axios.get('https://serverapivote.co.control360.co/questions/q/get-questions/' + id, {
          withCredentials: true, // Permite enviar cookies al servidor
      });

      if (response.status === 200) {
          const { hasQuestions, questions } = response.data;
          setestado(hasQuestions); // Actualiza el estado con la información de si tiene preguntas

       
       

          return { hasQuestions, questions }; // Devuelve el estado y las preguntas (si las tiene)
      }

      throw new Error("No se pudo procesar la solicitud.");
  } catch (error) {
      console.error("Error al obtener las preguntas:", error.response?.data || error.message);
      throw new Error(
          error.response?.data?.message || "No se pudo obtener las preguntas del usuario."
      );
  }
};



useEffect(() => {

  fetchQuestions();

},[]);
return (
  <div className='w-full h-full flex flex-col'>
    {estado? (
     <Questionfinalized></Questionfinalized>
    ) : (
      <>
        <SuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          duration={4000}
          message='Votación Creada correctamente'
        />

        <div className='w-full flex justify-end pr-10'>
          <Button onClick={handleSave}>Guardar</Button>
        </div>

        <div className='w-full h-full overflow-y-auto'>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 bg-blue-600 text-white p-3 -mx-6 -mt-6 rounded-t-lg">
                Votación de la Comunidad
              </h2>

              <div className="space-y-4">
                <div>
                  <textarea
                    className="w-full border rounded-md p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Descripción de la Votación..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

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

            {proposals.map((proposal) => (
              <Proposal
                key={proposal.id}
                proposal={proposal}
                onUpdate={(updatedProposal) => updateProposal(proposal.id, updatedProposal)}
                onDelete={() => deleteProposal(proposal.id)}
              />
            ))}

            <button
              onClick={addProposal}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Añadir Nueva Propuesta
            </button>
          </div>
        </div>
      </>
    )}
  </div>
);

}