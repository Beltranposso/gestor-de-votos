import React, { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';
import Timer from '../components/TimeLoby'
import { URI19 } from '../services/Conexiones';
import {useParams  } from 'react-router-dom';

import axios from 'axios';

export const Header = ({ assemblyName, DateTime, startTime,estado,onCreateVote,id }) => {

  const [timeLeft, setTimeLeft] = useState('');
const [Fecha, setFecha] = useState('0000-00-00');
const [CreacionDate,setCreacionDate] = useState('');
const[HoraInicio, setHoraInicio] = useState('');
const [mensaje, setMensaje] = useState('La asamblea comenzara pronto');


  const getfechaIncial = async () => {
    const response = await axios.get(URI19+id);
    setFecha(response.data.FechaInicio);
    setCreacionDate(response.data.createdAt);
    setHoraInicio(response.data.horaInicio);

   
   }
   
  






  useEffect(() => {
if(estado ==="Programada"){
  setMensaje('Muy Pronto Comenzamos');
}else if(estado ==="Activa"){
  setMensaje('La samblea ha comenzado');
}else if(estado ==="Finalizada"){
  setMensaje('La samblea ha finalizado');
}
  },[estado])
console.log("estado de esta vaina",estado);


  useEffect(() => {
    // Crear fecha de expiración combinando CreacionDate y HoraInicio
    const [year, month, day] =Fecha.split("-").map(Number);
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
        setMensaje("Asamblea Iniciada"); // Mensaje cuando ya ha pasado el tiempo
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
  
      // Lógica para mostrar mensaje cuando falten 10 minutos
      if (diff <= 10 * 60 * 1000 && diff > 9 * 60 * 1000) {
        setMensaje("En breve comenzamos");
      }
    };
  
    // Configurar el intervalo para actualizar cada segundo
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Ejecutar inmediatamente
  
    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [CreacionDate, HoraInicio]);

  useEffect(() => {
    getfechaIncial();
  },[]);
console.log(Fecha);

 
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-800">
        <Clock className="animate-pulse text-indigo-600" size={24} />
        <p className="text-2xl font-medium">{mensaje}</p>
      <Timer Time={estado==="Programada" ?timeLeft : estado==="Activa" ? "0" :""}></Timer>
      </div>
      <button 
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={onCreateVote}
      >
       
        Crear votación
      </button>
    </div>
  </div>
  );
};

export default Header;
