import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Modal } from './Modal';
import { ProgressBar } from './ProgressBar';
import { Link } from 'react-router-dom';



export function SuccessModal({ 
  isOpen, 
  onClose, 
  message = "Usuario creado correctamente",
  duration = 4000,
  id
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timer);
        setIsClosing(false);
      };
    }
  }, [isOpen, onClose, duration]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Éxito!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link
          to={`/Home/Cardinfo/${id}/listUsers`}
          onClick={onClose}
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