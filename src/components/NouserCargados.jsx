import { Users, PlusCircle } from 'lucide-react';
import {Link} from 'react-router-dom'
export default function EmptyAssemblyState({id,Usuario}) {
  return (
    <div className="min-h-[400px] w-5/6 flex flex-col items-center justify-center p-8 rounded-lg bg-gradient-to-b ">
      <div className="relative">
        <div className="absolute -right-4 -top-4">
          <PlusCircle className="w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <div className="bg-blue-100 rounded-full p-4">
          <Users className="w-12 h-12 text-blue-500" />
        </div>
      </div>
      
      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        No hay {Usuario} en la asamblea
      </h3>
      
      <p className="mt-2 text-center text-gray-600 max-w-sm">
        Aún no se han agregado {Usuario} a esta asamblea. Comienza agregando Para iniciar.
      </p>

      <Link to={`/Home/Cardinfo/${id}/Create`}  className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2 group">
        <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
        Agregar
      </Link>
    </div>
  );
}