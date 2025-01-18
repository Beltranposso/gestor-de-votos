import React, { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';


export const Header = ({ assemblyName, DateTime, startTime,estado,onCreateVote }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [message, setMessage] = useState('Muy Pronto Comenzamos');

  useEffect(() => {
if(estado ==="Programada"){
    setMessage('Muy Pronto Comenzamos');
}else if(estado ==="Activa"){
    setMessage('La samblea ha comenzado');
}else if(estado ==="Finalizada"){
    setMessage('La samblea ha finalizado');
}

  },[estado])



 
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-800">
        <Clock className="animate-pulse text-indigo-600" size={24} />
        <p className="text-lg font-medium">La asamblea comenzará pronto</p>
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
