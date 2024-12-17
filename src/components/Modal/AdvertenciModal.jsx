import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { ProgressBar } from './ProgressBar';


export default function WarningModal({ 
  isOpen, 
  onClose, 
  message = "La cédula ya se encuentra registrada",
  duration = 4000
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
        <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">¡Advertencia!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors mb-4"
        >
          Entendido
        </button>
        <div className="w-full">
          <ProgressBar duration={duration} isRunning={isOpen && !isClosing} />
        </div>
      </div>
    </Modal>
  );
}