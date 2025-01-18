import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SuccessMessage } from './SucessModalPoderes';



export function ConfirmationModal({ isOpen, onClose, onConfirm, selectedUsers,Nombre,Casa }) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    onConfirm();
  };

  const handleClose = () => {
    if (showSuccess) {
      setShowSuccess(false);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {showSuccess ? 'Éxito' : 'Confirmar Delegación'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        {showSuccess ? (
          <div className="p-6">
            <SuccessMessage />
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-gray-700 mb-4">¿Está seguro de delegar los siguientes poderes al usuario  <strong>{Nombre}</strong> con Propiedad <strong>{Casa}</strong>?</p>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <ul className="list-disc list-inside">
                {selectedUsers.map((userName, index) => (
                  <li key={index} className="text-gray-600">{userName}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}