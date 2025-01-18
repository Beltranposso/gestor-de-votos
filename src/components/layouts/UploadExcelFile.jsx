import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, Save } from 'lucide-react';
import { read, utils } from 'xlsx';
import { URI10 } from '../../services/Conexiones';
import axios from 'axios';
import ButtunDoulong from '../D';

import ImportanMessage from '../ImportantMensage';

const FileUploadModal = ({ isOpen, onClose, onFileUpload ,id}) => {
  const [dragActive, setDragActive] = useState(false);
  const [Mesagge, setMesagge] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const inputRef = React.useRef(null);

  if (!isOpen) return null;


 
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const processFile = async (file) => {
    try {
      setMesagge(null); // Reiniciar errores previos
  
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        throw new Error('Por favor, sube un archivo Excel (.xlsx o .xls)');
      }
  
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);
  
      if (jsonData.length === 0) {
        throw new Error('El archivo Excel está vacío');
      }
  
      // Normalizar los nombres de las columnas eliminando espacios
      const normalizedData = jsonData.map((row) => {
        const normalizedRow = {};
        Object.keys(row).forEach((key) => {
          const normalizedKey = key.replace(/\s+/g, '').trim(); // Eliminar espacios de los nombres de columnas
          normalizedRow[normalizedKey] = row[key];
        });
        return normalizedRow;
      });
  
      // Verificar si la columna Cédula existe
      const columnName = 'Cedula'; // Cambia esto según el nombre exacto de la columna en tu Excel (sin espacios)
      if (!normalizedData[0][columnName]) {
        throw new Error(`La columna "${columnName}" no existe en el archivo cargado.`);
      }
  
      // Validar duplicados en la columna
      const cedulaValues = normalizedData.map((row) => row[columnName]); // Extraer valores de la columna Cédula
      const duplicates = cedulaValues.filter(
        (value, index, array) => array.indexOf(value) !== index && value !== undefined && value !== null
      );
  
      if (duplicates.length > 0) {
        setMesagge(`Se encontraron valores duplicados en la columna ${columnName}: ${[...new Set(duplicates)].join(', ')}`);
        return; // Detener procesamiento si hay duplicados
      }
  
      // Validar que los valores en la columna "Cédula" sean solo números
      const invalidCedulas = cedulaValues.filter(
        (value) => typeof value !== 'number' && !/^\d+$/.test(value) // Aceptar solo números o strings numéricos
      );
  
      if (invalidCedulas.length > 0) {
     
        setMesagge(
          `Se encontraron valores inválidos en la columna "${columnName}". Los valores deben ser únicamente números. Valores no válidos: ${[...new Set(invalidCedulas)].join(', ')}`
        );
     
      }
  
      // Si todo está bien, procesar los datos
      setPreviewData(normalizedData); // Almacenar datos procesados para su visualización o envío al backend
    } catch (err) {
      setMesagge(err instanceof Error ? err.message : 'Error procesando el archivo');
    }
  };
  
  

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };


  const handleSave = async () => {
   
      try {
        const response = await axios.post(URI10+id , previewData);
    
        if (response.status === 200) {
          onClose();
          location.reload();
        } else {
          console.error('Error en la respuesta:', response);
          setMesagge('Error en la respuesta');
        }
      } catch (err) {
        console.error('Error al enviar los datos:', err);
        setMesagge('Error al acargar los datos');
      
      }
    
  };


  const handleCancel = () => {
    setPreviewData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      
      <ImportanMessage
          title="Aviso Importante"
          message="Recuerda que el archivo que subas debe tener los mismos campos y formato que la plantilla que descargaste."
          variant="warning"
        />
      <div className="relative h-[90vh] w-[90vw] max-w-6xl rounded-lg bg-white p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative flex justify-center mb-6 ">
          <div className='flex flex-col items-center'>
          <FileSpreadsheet className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Carga tu archivo Excel
          </h2>
          <p className="mt-2 text-sm text-gray-500">Es obligatorio descargar el plantilla, re cuerde </p>


          </div>
         
        </div>

        <div className="grid h-[calc(90vh-16rem)] grid-rows-[auto,1fr]">
          {!previewData ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={handleButtonClick}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleChange}
              />
              <Upload className="mb-4 h-10 w-10 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">XLSX or XLS files only</p>
            </div>
          ) : (
            <div className="flex h-full flex-col overflow-auto">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Data previa</h3>
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    <Upload className="h-4 w-4" />
                    Eliminar
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                  >
                    <Save className="h-4 w-4" />
                    Cargar Archivo
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="sticky top-0 bg-gray-50">
                    <tr>
                      {Object.keys(previewData[0]).map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {previewData.map((row, index) => (
                      <tr
                        key={index}
                        className="transition-colors duration-200 ease-in-out hover:bg-gray-50"
                      >
                        {Object.values(row).map((value, i) => (
                          <td
                            key={i}
                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-600"
                          >
                            {value?.toString()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                {Mesagge && (
                  <div className="text-red-600">
                    <AlertCircle className="inline h-5 w-5" />
                    <span>{Mesagge}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      <div className='w-full flex justify-center'>
       <ButtunDoulong></ButtunDoulong>
      </div>
      </div>
   
    </div>
  );
};

export default FileUploadModal;
