import React from 'react';
import { Users } from 'lucide-react';


export  const ProgressBar = ({ participants, maxParticipants,quorum }) => {
    const progress = (participants / maxParticipants) * 100;
 
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users size={20} />
          <span className='font-semibold text-sm'>Participantes: {participants}/{maxParticipants}</span>
        </div>
        <span className='font-semibold text-lg'>Quórum: <span >{quorum}</span> </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 ">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};



export default ProgressBar