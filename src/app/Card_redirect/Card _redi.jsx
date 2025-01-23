import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardButton from './Card_Button';
import Votantes from './Votantes';
import axios from 'axios';
import Acordion from '../../components/acordion'
import { Search } from 'lucide-react'
import { URI19, URI20 } from '../../services/Conexiones';
import Profile from '../../components/layouts/Profile';
import ExitButton from '../../components/ExitButtonHome';
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import ButtunIniar from '../../components/ButtonInciar';
import ConfirmationModal from '../../components/Modal/ConfirmationModal'
import  io  from 'socket.io-client';
import { Outlet, useNavigate } from "react-router-dom";
import { ExternalLink } from 'lucide-react';
import {getRouteByRole} from '../../components/rutes.js'
import ButtonPDf from '../../components/ButtonCretedPdf.jsx'
import ButtonsReports from '../../components/ButtonsReports.jsx'
/*   const socket = io('https://serverapivote.co.control360.co/');  */


  const socket = io('http://localhost:8000/');  
const CardInfo = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const [estado, setstado] = useState('');
    const [titulo, setTitulo] = useState('');
    const [description, setdescription] = useState('');
    const [HoraIncio, setHoraIncio] = useState('');
    const [color, setColor] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mesagge, setmesagge] = useState('');
    const[Cargo,setCargo]=useState('')
    const [ruta, setRuta] = useState('');
    const [Nombre,setNombre]=useState('');

    const Exit = () => {
        navigate('/admin/AsambleaControl');
    }


    const getCardInfo = async () => {

        const response = await axios.get(`${URI19}${id}`);
        setTitulo(response.data.Title);
        setstado(response.data.Estado);
        setHoraIncio(response.data.FechaInicio);



    } 

    const obtenerUsuarioInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8000/get-user-info', {
                withCredentials: true, // Asegúrate de enviar cookies con la solicitud
            });
    
            if (response.status === 200) {
                setCargo(response.data.Cargo);
            }
        } catch (error) {
            console.error("Error al obtener información del usuario:", error.response?.data?.message || error.message);
            return null; // Retorna null o maneja el error como prefieras
        }
    };
    //essta funcion hay que poasarla al MainDesboard

    /* useEffect(() => {
        Socket.on('M', (señal) => {
            setSeñal(señal);
            })
            getQuestdions();
            getOption();
            getVotos();
            getuser();
            }, [Señal]);
            
    
            */

            const obtenerUsuarioInfoName = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/get-info-by-token', {
                        withCredentials: true, // Asegúrate de enviar cookies con la solicitud
                    });
            
                    if (response.status === 200) {
                        const { Cargo, Nombre } = response.data;
                    
                        setNombre(Nombre);
                        return { Cargo, Nombre }; // Retorna los datos si la solicitud es exitosa
                    }
                } catch (error) {
                    console.error("Error al obtener información del usuario:", error.response?.data?.message || error.message);
                    return null; // Retorna null o maneja el error como prefieras
                }
            };
            

            const obtenerRuta = async () => {
                const ruta = await getRouteByRole();
               
                setRuta(ruta);

                 // Muestra la ruta obtenida en consola
            };
            
          
            
            const IniciarAsamblea = async () => {
        try {
                if(Cargo=='Administrador'){
                    const response = await axios.put(`${URI20}${id}`);
               
                    if (response.status === 200) {
                        socket.emit('estadoA', 'Estatus: '+estado);
                        setstado(response.data.Estado);

                        if (estado == 'Programada') {          
                            getCardInfo();
                            getCardInfo();
        
                    }
                }
                
            }else if (Cargo=='Coordinador'){
                const response = await axios.put(`${URI20}${id}`);
                socket.emit('estadoA', 'Estatus: '+estado);
                setstado(response.data.Estado);
                if (response.status === 200) {
                    if (estado == 'Programada') {
                        window.open(`/coordi/loby/${id}`);
                        getCardInfo();
                        getCardInfo();
                    }
    
                }
            }
                
    
    
    
    } catch (error) {
            console.log(error);
        }


    }



useEffect(() => {
    obtenerUsuarioInfo()
    obtenerUsuarioInfoName()
    obtenerRuta();
},[])





    useEffect(() => {
        if (estado == 'Programada') {
            setColor('bg-sky-400');
        } else if (estado == 'Activa') {
            setColor('bg-green-400');
        } else if (estado == 'Finalizada') {
            setColor('bg-red-500');
        }
    }, [estado])





    useEffect(() => {

        if (estado == 'Programada') {
            setmesagge('Iniciar Asamblea');
        } else if (estado == 'Activa') {
            setmesagge('Esta seguro de Finalizar la Asamblea?');
        } else if (estado == 'Finalizada') {
            setmesagge('Asamblea Finalizada');
        }


    }, [estado])






    useEffect(() => {
        navigate('Dashboard');
        getCardInfo();
    }, [estado])









    return (
        <div className='flex justify-start items-center bg-[#E6E6E6] gap-1 h-screen px-2 py-2'>

            <ConfirmationModal

                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={IniciarAsamblea}
                title="Confirmación"
                message={mesagge}

            />

            <div className='flex gap-2 flex-col h-full w-[20%] max-w-[20%] bg-zinc-950 rounded-lg p-3 mr-2 justify-between '>
                <div className='flex flex-col gap-2'>
                    <Profile Cargo={Cargo} Name={Nombre}></Profile>
                    <div className="relative w-full max-w-2xl  mb-3  ">
                     {/*    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                            <Search className="h-5 w-5 text-muted-foreground text-white" />
                        </div>
                        <input
                            type="search"
                            placeholder="Search for anything"
                            className="h-10 w-full bg-background/5 rounded-xs pl-10 text-base placeholder:text-muted-foreground focus-visible:ring-1 dark text-white bg-zinc-950 mb"
                        /> */}
                    </div>





                    <Acordion></Acordion>


                </div>

                <div className='w-full h-full flex flex-col justify-between pt-1'>

                        <div className='flex flex-col gap-3'>
                        <ButtunIniar estado={estado} onClick={() => setIsModalOpen(true)}></ButtunIniar>
                        

                        </div>
                    <ExitButton onClick={Exit} ></ExitButton>


                </div>

            </div>


            <div className='flex flex-col gap-2 h-full w-[100%] max-w-[1500px]   rounded-lg   '>
                <header className='bg-white h-20 rounded-t-lg px-3 items-center flex justify-between'>
                    <div className='flex justify-center flex-col w-[300px] gap-2'>
                        <h1 className='text-2xl'>{titulo ? titulo : <Skeleton className="h-4 w-[300px]" />}</h1>
                     
                    </div>

                    <div className='flex h-full gap-8'>

                        <div className='flex gap-3  justify-center items-center '>



                            {estado ?
                                <Badge className={`w-auto p-2 h-8 flex justify-center ${color}`} >{estado}</Badge>
                                :
                                <Skeleton className="h-7 w-[100px]" />
                            }


                        </div>


                        <div className='flex h-full justify-center items-center gap-2'>
                           
                            <div className=" bg-gray-100 flex items-center justify-center">
      <a
        href={`https://asambleascontrol.com.control360.co${ruta}/loby/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm"
      >
        <span>Vista para proyectar</span>
        <ExternalLink size={20} />
      </a>
    </div>

 <ButtonsReports estado={estado} id={id}></ButtonsReports>
                        </div>

                    </div>
                </header>
                <main className='h-full bg-white rounded-b-lg flex p-3 gap-4 overflow-hidden justify-center items-center'>

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default CardInfo;

{/*       <div className='a'>d</div>
    <div className='c'>f</div> */}

{/*   <main className='C'>
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
      </main> */}