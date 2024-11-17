import './card_redi.css'
import React from 'react';
import Grafficas from './Grafficas';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import CardButton from './Card_Button';
import Votantes from './Votantes';
import axios from 'axios';
import { set } from 'react-hook-form';
import {URI2,URI3,URI6,URI5} from '../../services/Conexiones';
import io from 'socket.io-client';

const Socket = io('https://serverapivote.co.control360.co');

 
const CardInfo = () => {
    const { id } = useParams();
    
const [optionVotes, setOptionVotes] = useState([]);
const [Questionsdata, setQuestionsdata] = useState([]);
const [Optiondata, setOptiondata] = useState([]);
const [Votesdata, setVotesdata] = useState([]);
const[Numvotos,setNumerosVotos]=useState(0);
const [opciones, setOpciones] = useState([]);
const[idPregunta,setidPregunta]=useState('');
const [users, setUsers] = useState([]);
const [Señal, setSeñal] = useState([]);


const getQuestdions = async () => {
    const response = await axios.get(URI2+id);//, params:   id);
    setQuestionsdata(response.data.Pregunta);
    setidPregunta(response.data.id);
};

const getOption = async () => {
    const response = await axios.get(URI3);
    setOptiondata(response.data);//, params:   id);
;
};
const getVotos = async () => {
    const response = await axios.get(URI6);
    setVotesdata(response.data);//, params:   id);

}

const getuser = async () => {
const response  = await axios.get(URI5)
setUsers(response.data)
};

useEffect(() => {
    Socket.on('M', (señal) => {
        setSeñal(señal);
    })
    getQuestdions();
    getOption();
    getVotos();
    getuser();
}, [Señal]);


    const OptionFilter = Optiondata.filter((option) => option.id_pregunta === idPregunta).map((option) => option.id);

    const OptionFilter2 = Optiondata.filter((option) => option.id_pregunta === idPregunta ).map((option) => option.opcion);

    const VotosFilter = Votesdata.filter((voto) => OptionFilter.includes(voto.id_Option)).length;
 
    const votosFilter_2 = Votesdata.filter((voto) => voto.id_card === id);
    

 
 useEffect(() => {
    
setNumerosVotos(votosFilter_2.length)
setOpciones(OptionFilter2)
},[VotosFilter]); 





useEffect(() => {
    if (idPregunta && Optiondata.length > 0 && Votesdata.length > 0 && users.length > 0) {
        const filteredOptions = Optiondata.filter((option) => option.id_pregunta === idPregunta);
        const optionTexts = filteredOptions.map((option) => option.opcion);

        // Crear un Map para obtener el poder de cada usuario usando la cédula
        const userPowerMap = new Map(users.map((user) => [user.Cedula, user.poder]));

        // Calcular votos ponderados
        const OptionVotesList = filteredOptions.map((option) => {
            return Votesdata
                .filter((voto) => voto.id_Option === option.id)
                .reduce((total, voto) => {
                    const userPower = userPowerMap.get(voto.id_voter) || 0; // Obtener poder desde userPowerMap
                  
                    return total + userPower;
            },0 );
        });

        setOpciones(optionTexts);
        setOptionVotes(OptionVotesList);
    }
}, [idPregunta, Optiondata, Votesdata, users]);



    return (
        <div className='Card_info'>
         

            <main className='C'>
                <div className='a'>
                    <div className='a_double'>
                        <div className='a_Cards'>
                           <CardButton></CardButton>
                          
                          
                           
                        </div>  
                        <div className='a_Users'>
                           <header className='a_Users_header'>
                            <h5>Votantes</h5>
                            <input className="a_shear_user" type="text" placeholder={"Busca un usuario"}/>
                           </header>
                           <main >
                            <div className='a_Users_main'>


                            {votosFilter_2.map((voto) => (
                                <Votantes key={voto.id} votantes={voto.id_voter}>                               
                                </Votantes>
                            ))}

                          
                          
                                    
                        
                        
                            </div>
                           
                           </main>
                        </div>
                            
                    </div>
                    <div className='a_User'>
                        <div className='Profile'>
                            <div className='a_Profile_img'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
</svg>
                            </div>
                            Administrador
                        </div>
                    </div>



                </div>

                <div className='c'>
                   
           <div className='c_info'>
                
   
                    <header className='c_h'>
                        <div className='contentVotos_1'>

                            <div className='Votos_info'>
                                <div className='titulo'>
                                    <h4>Respuestas</h4>
                                </div>
                                <div className='numeroDevotos'>
                                    <h4 className='number_votos'>{Numvotos}</h4>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                </div>
                            </div>
                            <div className='Time_info'>
                            <div className='titulo'>
                                    <h4>Tiempo</h4>
                                </div>
                                <div className='numeroDevotos'>
                                    <h4 className='number_votos'>0:00</h4>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-4">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M12 12l3 2" />
                                        <path d="M12 7v5" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </header>



                    <main className='M'>

                        <Grafficas pregunta={Questionsdata} opciones={opciones} data={optionVotes}></Grafficas>
                       
                                                   


                    </main>


                    </div>
                </div>
            </main>
            
        </div>
    );
};

export default CardInfo;

{/*       <div className='a'>d</div>
      <div className='c'>f</div> */}
