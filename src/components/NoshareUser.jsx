import React from 'react';
import { SearchX, Sparkles, RefreshCw, Type } from 'lucide-react'

 const  UserNotFound = ({ searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center w-full h-full">
      <div className="bg-white rounded-full p-8 mb-6 shadow-lg shadow-green-100/50">
        <SearchX className="w-20 h-20 text-green-500 animate-pulse" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
        No results found
      </h2>
      <p className="text-lg text-gray-600 mb-6">No se encontraron resultados para "{searchTerm}".</p>     
    </div>
  );
}
export default UserNotFound