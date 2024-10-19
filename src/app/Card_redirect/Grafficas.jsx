
import React from 'react';
import './Graficas.css';
import Pie from './PiesChart'
import { useParams } from 'react-router-dom';


const Grafficas = ({pregunta,opciones,data}) => {
   



  return (
    <div className='Content_Graficas'>
       
      <header className='Content_Pregunta'>
        <h6>{pregunta}</h6>
      </header>
      <div className='Graficas'>
        <div className='Graficas_1'>
        <Pie value={data} options={opciones}></Pie>
        </div>
        <div>

        </div>

      </div>
    </div>
   
  );
};

export default Grafficas;
