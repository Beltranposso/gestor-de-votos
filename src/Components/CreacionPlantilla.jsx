import React from 'react';
import '../Plantilla.css';

const CreacionPlantilla = () => {
    return (
        <div className='Content_CreacionPlantilla'>
            <div className='Controls'>
                <div>
                <button className='buttun_eddit'>
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-letter-case-toggle">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6.5 15.5m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0" />
                <path d="M14 19v-10.5a3.5 3.5 0 0 1 7 0v10.5" />
                <path d="M14 13h7" />
                <path d="M10 12v7" />
                    </svg>
                </button>
                </div>
                <div>
                <button  variant="light"  className='buttun_eddit'>
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-palette">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                    <path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                    <path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                </svg>
                </button>
                </div>
                
                <div>
            <button className='buttun_eddit'>
                <svg xmlns="http://www.w3.org/2000/svg" width={38} height={38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
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
            />
                </div>



            <div className="ContenedorSetPreguntas"> 
                
                <input type="text" className="Pregunta" placeholder="Pregunta" />
                <div className="options">
                    <div className="option">
                        <input type="radio" name="option1" />
                        <input type="text" placeholder="Opción_1" />
                    </div>
                    <div className="option">
                        <input type="radio" name="option2" />
                        <input type="text" placeholder="Opción_2" />
                    </div>
                    <div className="add-option">
                        <div>

                        <span>+</span>
                        <input type="text" placeholder="" />
                        </div>
                <button className="remove-question"><svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg></button>
                    </div>
                </div>
            </div>
            <button className="add-question">Agregar otra pregunta +</button>
            
            </div>
<button className="finish-button">Finalizar</button>
        </div>
    );
};

export default CreacionPlantilla;
