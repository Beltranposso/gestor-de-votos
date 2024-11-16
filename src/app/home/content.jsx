import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { URI } from '../../services/Conexiones';
 import Card_Home from '../../components/layouts/Card_votacion';

import axios from 'axios'
import { jwtDecode } from "jwt-decode"
 import '/src/App.css';
/* import '../Animations.css'; */


const Home = () => {

  const [Asamblea, setAsamblea] = useState([
  
  ]);
  


  
 /*  const getCard = async () => {
    const response = await axios.get(URI);
    setCards(response.data);
  };  */
  const getAsamblea = async () => {
    const response = await axios.get(URI);
    setAsamblea(response.data);
  };
  useEffect(() => {
   getAsamblea();
     
  }, []);

  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const Cedula= decoded.Cedula
/*   console.log(Cedula) */
  
  const FiltradoAsamblea = Asamblea.filter(Asamble => Asamble.UserId  === Cedula );
/*   console.log(FiltradoAsamblea) */

  return (
   
    <div className='w-full h-5/6'>
{/*           <Hme></Hme> */}
   <main className='main'>
      
   
    <div className="Home">
      <div className="search-bar_Home">
        <div>
          <input className='input_text_buscar' type="text" placeholder="Buscar" />
          <span className="filter-icon">A-Z</span>
        </div>
        <Link
  className="flex justify-center items-center h-full bg-gray-50 hover:bg-gray-200 transition-all duration-300 ease-in-out w-32 active:scale-95 mr-14 rounded"
  to="/Creacion"
>
  Crear +
</Link>
      </div>
      <div className='Content_Card'>
        <h2 className='fs-3'>Encuestas en curso</h2>
        <div className='content_Card_2'>
          {FiltradoAsamblea.map((asamblea) => (
            <Card_Home  id={asamblea.id} titulo={asamblea.Title} hora={asamblea.createdAt} color={asamblea.Color} />
           
          ))} 
        </div>
      </div>

    </div>
    </main>
    </div>
  );
};

export default Home;
