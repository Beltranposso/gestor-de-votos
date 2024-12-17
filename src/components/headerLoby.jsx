import React, { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';

export const Header = ({ assemblyName, DateTime, startTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [message, setMessage] = useState('Muy Pronto Comenzamos');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const [startHour, startMinute] = startTime.split(':').map(Number);

      const now = new Date();
      const targetDate = new Date();

      targetDate.setHours(startHour, startMinute, 0, 0);

      // Si la hora objetivo ya pasó hoy, configúrala para el día siguiente
      if (targetDate <= now) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setTimeLeft('');
        setMessage('¡La asamblea ha comenzado!');
        return;
      }

      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      // Cambiar el mensaje si faltan 30 minutos o menos
      if (timeDifference <= 30 * 60 * 1000) {
        setMessage('En breve comenzamos');
      } else {
        setMessage('Muy Pronto Comenzamos');
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Llamar inmediatamente para mostrar el tiempo inicial

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, [startTime]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{message}</h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={20} />
          <span>Hora de Inicio: {DateTime} - {startTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users size={20} />
          <span>Sala de Espera</span>
        </div>
      </div>
      {timeLeft && message !== '¡La asamblea ha comenzado!' && (
        <div className="mt-4 text-gray-700 text-lg">
          Tiempo restante: <strong>{timeLeft}</strong>
        </div>
      )}
    </div>
  );
};

export default Header;
