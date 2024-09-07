import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import '../Plantilla.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"
import Hme from './Hme';

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

  const navigate = useNavigate();

  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const Cedula= decoded.Cedula
  console.log(Cedula)
  const Finalizar = async (e) => {
    e.preventDefault();

    try {
      // Crear el título y la pregunta
      await axios.post(URI, { Title: title, Color: color ,Userid:Cedula});
      await axios.post(URI2, { id_title: title, Pregunta: Question });


        axios.post(URI3, { id_pregunta: Question,opcion:option1})   
        axios.post(URI3, { id_pregunta: Question,opcion:option2})


     
      navigate('/Home');
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
        <div className='content'>
      <Hme />
      <main className='main'>
        <form onSubmit={Finalizar} on className='Content_CreacionPlantilla' style={{ backgroundColor: color }}>
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
                <div   className='content_2'>
           {/*  <form className='formulario' onSubmit={Finalizar}> */}
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
                    <div className='content_3' style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {questions.map((question, index) => (
                            <div key={question.id} className="ContenedorSetPreguntas">
                                
                                <div className="question-header">
                                    <input
                                        type="text"
                                        className="Pregunta"
                                        placeholder={`Pregunta ${index + 1}`}
                                        style={{ fontFamily: font }}
                                        value={question.text}
                                        onChange={e => handleQuestionChange(question.id, e.target.value)}
                                    />
                                    <button className="remove-question" onClick={(e) => removeQuestion(e, question.id)} type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                    </button>
                                </div>
                                    
                                <div className="options">
                                    {question.options.map((option, optIndex) => (
                                        <div key={optIndex} className="option">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                checked={question.selectedOption === option}
                                                onChange={() => handleRadioChange(question.id, option)}
                                            />
                                            <input
                                                type="text"
                                                placeholder={`Opción_${optIndex + 1}`}
                                                style={{ fontFamily: font }}
                                                value={option}
                                                onChange={e => handleOptionChange(question.id, optIndex, e.target.value)}
                                            />
                                            <button className="remove-option" onClick={(e) => removeOption(e, question.id, optIndex)} type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7l16 0" />
                                            <path d="M10 11l0 6" />
                                            <path d="M14 11l0 6" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <button className="add-option" onClick={(e) => addOption(e, question.id)} type="button">
                                        Agregar opción +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                <div className='Contenedor_Pregunta'>
                </div>
                   {/*  </form> */}
                    <button className="add-question" onClick={addQuestion} type="button">
                        Agregar otra pregunta +
                    </button>
                </div>
                <button type="submit" className='finish-button'>Finalizar</button>
                        
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
