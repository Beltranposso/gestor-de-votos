import React from 'react';
import { Timer, Vote } from 'lucide-react';

function App() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center space-x-2">
          <Vote className="w-8 h-8 text-indigo-600" />
          <Timer className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800">
          ¡Ya Finalizo la asamblea!
        </h1>
        
        <p className="text-gray-600">
          Revisa los resultados
        </p>
      </div>
    </div>
  );
}

export default App;