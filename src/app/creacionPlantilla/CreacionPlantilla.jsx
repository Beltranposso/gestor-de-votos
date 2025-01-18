import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SketchPicker } from 'react-color';
import './Plantilla.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"

/* import { nanoid } from 'nanoid'; */
/* import Hme from './Header'; */

/*  
const URI = 'https://serverapivote.co.control360.co/card/';
const URI2 = 'https://serverapivote.co.control360.co/questions/'; 
const URI3 = 'https://serverapivote.co.control360.co/options/'; */

 const URI = 'http://localhost:8000/card/';
const URI2 = 'http://localhost:8000/questions/'; 
const URI3 = 'http://localhost:8000/options/';
 

const CreacionPlantilla = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [color, setColor] = useState('#fff');
  const [Question, setQuestion] = useState('');
  const [title, setTitle] = useState('');
  const [option1, setOptions1] = useState('');
  const [option2, setOptions2] = useState('');
  const [font, setFont] = useState('Arial');
  const [miId, setMiId] = useState(null);  // Almacena tu propio ID
  const [destinatarioId, setDestinatarioId] = useState(''); 

  const navigate = useNavigate();

  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const Cedula= decoded.Cedula

  const uniqueID = uuidv4();
  const uniqueIDPregunta = uuidv4();
  const codificadoID = btoa(uniqueID)

  const Finalizar = async (e) => {
    e.preventDefault();
  
    try {
      // Crear el título y la pregunta
      await axios.post(URI, {id: uniqueID, Title: title, Color: color ,UserId:Cedula,link:`${'https://serverapivote.co.control360.co'}/c/${codificadoID}`});
      await axios.post(URI2, {id: uniqueIDPregunta, id_card: uniqueID, Pregunta: Question });


        axios.post(URI3, { id_pregunta: uniqueIDPregunta, opcion:option1})   
        axios.post(URI3, { id_pregunta: uniqueIDPregunta, opcion:option2})


      
      navigate('/H');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  const Finalizar2 = async (e) => {
    e.preventDefault();

    try {
      // Crear el título y la pregunta
      /* el puerto se tiene que cambiar cuando se vaya a desplegar  */
      await axios.post(URI, {id: uniqueID, Title: title, Color: color ,UserId:Cedula,link:`${'https://serverapivote.co.control360.co'}/c/${codificadoID}`});

      await axios.post(URI2, {id: uniqueIDPregunta, id_card: uniqueID, Pregunta: Question });


      axios.post(URI3, { id_pregunta: uniqueIDPregunta, opcion:option1})   
      axios.post(URI3, { id_pregunta: uniqueIDPregunta, opcion:option2})
        
      

        navigate('/loby/' + uniqueID);
       
     
        
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
      
    };
    
   
        
        

      


  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    setShowColorPicker(false);
  };

  const handleFontChange = (font) => {
    setFont(font);
    setShowFontPicker(false);
  };


  return (
    <div >
          
      
      <main className='flex items-center justify-center'>
        <form className='Content_CreacionPlantilla ' style={{ backgroundColor: color }}>
          <div className='Controls'>
            <div className='icon-container'>
              <button
                className={`buttun_eddit ${showColorPicker ? 'selected' : ''}`}
                onClick={() => setShowColorPicker(!showColorPicker)}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-palette">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                  <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
              </button>
              {showColorPicker && (
                <div className="color-picker-popover">
                  <div className="color-picker-cover" onClick={() => setShowColorPicker(false)} />
                  <SketchPicker color={color} onChangeComplete={handleColorChange} />
                </div>
              )}
            </div>
            <div>
              <button
                className={`buttun_eddit ${showFontPicker ? 'selected' : ''}`}
                onClick={() => setShowFontPicker(!showFontPicker)}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={38}
                  height={38}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icon-tabler-font"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1v-16" />
                  <path d="M10 3v18" />
                  <path d="M14 3v18" />
                </svg>
              </button>
            </div>
            <div>
              <button className='buttun_eddit' type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-eye">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className='content_2'>
            <div className='setTitle'>
              <input
                type="text"
                className="survey-title"
                placeholder="Título de la encuesta"
                value={title}
                style={{ fontFamily: font }}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='Content_Questions'>
              <div className='ContentQuestions'>
                <input 
                  type="text"
                  className="survey-Questions"
                  placeholder="Pregunta"
                  value={Question}
                  style={{ fontFamily: font }}
                  onChange={e => setQuestion(e.target.value)}
                />
              </div>

              <div className='Options'>
              
                  <input
                    type="text"
                    className='survey-Option'
                    placeholder={`Opción1`}
                    value={option1}
                    style={{ fontFamily: font }}
                    onChange={e =>setOptions1(e.target.value)}
                  />
                     <input
                    type="text"
                    className='survey-Option'
                    placeholder={`Opción1`}
                    value={option2}
                    style={{ fontFamily: font }}
                    onChange={e =>setOptions2(e.target.value)}
                  />
             
              </div>
              
              <button type="button" onClick={console.log("muy pronto mas opciones")}>Añadir opción</button> 
            </div>
          </div>

          <button onClick={Finalizar} className='finish-button'>Guardar</button>
          <button onClick={Finalizar2} to='/loby' className='finish-button'>Guardar e iniciar</button>
          
          {showFontPicker && (
            <div className="dropdown-container">
              <ul className="dropdown-list">
                <li onClick={() => handleFontChange('Arial')}>Arial</li>
                <li onClick={() => handleFontChange('Courier New')}>Courier New</li>
                <li onClick={() => handleFontChange('Georgia')}>Georgia</li>
                <li onClick={() => handleFontChange('Times New Roman')}>Times New Roman</li>
                <li onClick={() => handleFontChange('Verdana')}>Verdana</li>
              </ul>
            </div>
          )}
        </form>
      </main>
       </div>

  
    );
};

export default CreacionPlantilla;
