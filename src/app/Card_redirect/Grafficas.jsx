import React, { useEffect, useState } from 'react';
import './Graficas.css';
import Pie from './PiesChart';
import { useParams } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { URI6, URI3, URI13, URI2 } from '../../services/Conexiones';
import axios from 'axios';

const Grafficas = ({ questions = [],señal }) => {
  const { id } = useParams(); // Obtener el ID de la ruta
  const [Optiondata, setOptiondata] = useState([]); // Opciones disponibles
  const [Votesdata, setVotesdata] = useState([]); // Votos registrados
  const [users, setUser] = useState([]); // Usuarios y su poder de voto
  const [opcion, setOpciones] = useState([]); // Opciones de texto para graficar
  const [optionVotes, setOptionVotes] = useState([]); // Cantidad de votos ponderados por opción
  const [Questionsdata, setQuestionsdata] = useState([]); // Preguntas disponibles
  const [Pregunta, SetPregunta] = useState(''); // Texto de la pregunta seleccionada
  const [selectedQuestion, setSelectedQuestion] = React.useState(questions[0]?.id || "");

  
  // Obtener datos de las opciones
  const getOption = async () => {
    const response = await axios.get(URI3);
    setOptiondata(response.data);
  };

  // Obtener datos de los votos
  const getVotos = async () => {
    const response = await axios.get(URI6);
    setVotesdata(response.data);
  };

  // Obtener datos de los usuarios
  const getUser = async () => {
    const response = await axios.get(URI13+ id);
    setUser(response.data);
  }; 

  // Obtener datos de las preguntas
  const getQuestions = async () => {
    const response = await axios.get(URI2 + id);
    setQuestionsdata(response.data);
  };

  // Cargar datos iniciales
  useEffect(() => {
   
   
    getOption();
    getVotos();
    getUser();
    getQuestions();
  }, [señal]);
  


  // Procesar datos cuando cambia la pregunta seleccionada
  useEffect(() => {
    if (
        selectedQuestion &&
        Optiondata.length > 0 // Asegúrate de que los datos de opciones ya están cargados
    ) {
        const filteredOptions = Optiondata.filter((option) => {
         
            return option.id_pregunta === selectedQuestion;
        });

      

        const optionTexts = filteredOptions.map((option) => option.opcion);

        

        // Si necesitas calcular votos ponderados
        if (Votesdata.length > 0 && users.length > 0) {
            const userPowerMap = new Map(users.map((user) => [user.Cedula, user.quorum]));

            const OptionVotesList = filteredOptions.map((option) => {
                return Votesdata.filter((voto) => voto.id_Option === option.id).reduce(
                    (total, voto) => {
                        const userPower = userPowerMap.get(voto.id_voter) || 0;
                        return total + userPower;
                    },
                    0
                );
            });

            setOptionVotes(OptionVotesList);
        }

        setOpciones(optionTexts);
    }
}, [selectedQuestion, Optiondata, Votesdata, users]);

  useEffect(() => {
    // Si las preguntas cambian, actualiza el valor predeterminado
    if (questions.length > 0 && !selectedQuestion) {
      setSelectedQuestion(questions[0].id);
      SetPregunta(questions[0].Pregunta);
    }
  }, [questions, selectedQuestion]);
 








  return (
    <div className="h-[100%] w-full flex flex-col">
      <header className="flex justify-between w-full  ">
        <span className="text-sm w-40 h-10 overflow-hidden overflow-ellipsis">{Pregunta}</span>
        <Select
          value={selectedQuestion}
          defaultValue={questions[0]?.id}
          onValueChange={(value) => {
            setSelectedQuestion(value);
            // Encuentra la pregunta seleccionada y actualiza el texto
            const selected = questions.find((q) => String(q.id) === value)|| questions[0].id;
            if (selected) {
              SetPregunta(selected.Pregunta);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar pregunta" />
          </SelectTrigger>
          <SelectContent>
            {questions.map((question) => (
              <SelectItem key={question.id} value={String(question.id)}>
                {question.text || `Pregunta ${question.Pregunta}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      <main className="h-[100%] w-4/6 overflow-hidden">
          <Pie value={optionVotes} options={opcion} />
    
      
      </main>
    </div>
  );
};

export default Grafficas;
