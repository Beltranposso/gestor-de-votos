import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Share2,ScanQrCode } from 'lucide-react';
import { useParams,useNavigate } from 'react-router-dom';




export const QRCodeSection = () => {
    const [link, setLink] = useState('');
    const [QRurl, setQRurl] = useState('');
    const {id} = useParams();
    const Codify = btoa(id);


    const generateQRCode = async () => {
        try {
    
          // Puedes cambiar esta URL por la que deseas generar
      const url = await QRCode.toDataURL(`https://control360.co/c/${Codify}`);
          setQRurl(url);
       
        } catch (error) {
          console.error('Error generando el código QR', error);
        }
      };


useEffect(() => {
    generateQRCode();
  }, []);


    return (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center break-all ">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Unirse a la Asamblea</h2>
      <div className="flex w-full h-auto py-2 items-center justify-center mb-6">
      {QRurl ? (
          <img className='' src={QRurl} alt="Código QR"/>
        ) : (
            <p>Generando código QR...</p>  
        )}
      </div>
      <div className="flex items-center justify-center gap-2 text-blue-600">
        <Share2 size={20} />
        <span className="font-medium">Escanea para unirte</span>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        O ingresa directamente usando este enlace:
      </p>
      <div className=''>
      <a
        href={`https://control360.co/c/${Codify}`}
        className="text-blue-600 hover:text-blue-800 underline text-sm mt-1 block text-wrap "
        target="_blank"
        rel="noopener noreferrer"
        >
        {`https://control360.co/c/${Codify}`}
      </a>
      </div>
    </div>
  );
};

export default QRCodeSection;