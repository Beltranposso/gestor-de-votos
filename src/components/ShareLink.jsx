import React from 'react';
import { Link } from 'lucide-react';


export const ShareLink = ({ joinLink }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
      <Link size={20} className="text-gray-600" />
      <div className="flex-1 truncate">
        <p className="text-sm font-medium text-gray-900 truncate">{joinLink}</p>
      </div>
      <button 
        onClick={() => navigator.clipboard.writeText(joinLink)}
        className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors"
      >
        Copiar
      </button>
    </div>
  );
};