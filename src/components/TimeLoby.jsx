import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon } from 'lucide-react';



export const Timer= ({ Time }) => {


  

  return (
    <div className="flex items-center gap-2 text-lg font-mono bg-gray-100 px-3 py-1 rounded-lg">
      <TimerIcon className="text-indigo-600" size={18} />
      <span className="tabular-nums">
          {Time}
      </span>
    </div>
  );
};


export default Timer