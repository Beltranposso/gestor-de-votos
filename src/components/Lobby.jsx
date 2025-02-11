import React from 'react';
import { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';



export const Lobby = ({ participants, maxParticipants, quorum}) => {
  const [QRurl, setQRurl] = useState('');
  const [Idcard, setIdcard] = useState('');
  const {id} = useParams();
  const Codify = btoa(id);
  const generateQRCode = async () => {
    try {

      // Puedes cambiar esta URL por la que deseas generar
  const url = await QRCode.toDataURL(`https://controlvotantes360.co.control360.co/c/${Codify}`);
      setQRurl(url);
   
    } catch (error) {
      console.error('Error generando el código QR', error);
    }
  };






  
  useEffect(() => {
    generateQRCode();
  }, []);






  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full space-y-8 border border-gray-200 h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenidos</h1>
        <p className="text-gray-600">Escanea el código QR para unirte</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="bg-gray-100 p-4 rounded-xl">
          {QRurl ? (
          <img className='' src={QRurl} alt="Código QR"/>
        ) : (
            <p>Generando código QR...</p>  
        )}
          </div>
        </div>

        <div className="space-y-8 flex flex-col justify-center">
          <ProgressBar 
            participants={participants} 
            maxParticipants={maxParticipants} 
            quorum={quorum}

          />
      
        </div>
      </div>
    </div>
  );
};

export default Lobby;