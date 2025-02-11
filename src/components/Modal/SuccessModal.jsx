import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from './Modal';
import { ProgressBar } from './ProgressBar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getRouteByRole} from '../../components/rutes.js'
import { use } from 'react';

export function SuccessModal({ 
  isOpen, 
  onClose, 
  message = "Usuario creado correctamente",
  duration = 4000,
  id,
  onClick,
  rute
}) {

  const nav = useNavigate()
  const [isClosing, setIsClosing] = useState(false);
  const [ruta, setRuta] = useState('');
  const [Rute, setRute] = useState('');



  const obtenerRuta = async () => {
    const ruta = await getRouteByRole();

     setRuta(ruta);
 
      // Muestra la ruta obtenida en consola
 };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const timer = setTimeout(() => {
        onClose();
        nav(rute);

      }, duration);

      return () => {
        clearTimeout(timer);
        setIsClosing(false);
      };
    }
  }, [isOpen, onClose, duration]);




  useEffect(() => {

    if(ruta==='/Admin'){
      setRute(`/Admin/Cardinfo/${id}/Dashboard`);
    }else if(ruta==='/coordi'){
      setRute('');
    }

    obtenerRuta();
  }, []);



 
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Éxito!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link

          to={rute}
 

          onClick={() => {onClose, onClick()}}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mb-4"
        >
          Aceptar
        </Link>
        <div className="w-full">
          <ProgressBar duration={duration} isRunning={isOpen && !isClosing} />
        </div>
      </div>
    </Modal>
  );
}