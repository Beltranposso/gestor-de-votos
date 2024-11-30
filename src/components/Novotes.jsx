import React from 'react';


export default  function NoVotesMessage({ 
  message = "No hay votaciones recientes"  }) {
  return (
    <div className={`flex flex-col w-full h-full  items-center justify-center p-6 bg-gray-50 rounded-lg shadow-sm `}>
      <svg 
        className="w-12 h-12 text-gray-400 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      <p className="text-gray-600 text-lg text-center font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-2">Espera a que la Asamblea empieze o los  usuarios voten </p>
    </div>
  );
}