import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { URI } from '../../services/Conexiones';
 import Card_Home from '../../components/layouts/Card_votacion';

import axios from 'axios'
import { jwtDecode } from "jwt-decode"
 import '/src/App.css';
/* import '../Animations.css'; */
import { Card } from 'react-bootstrap';

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
  console.log(Asamblea)
  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const Cedula= decoded.Cedula
/*   console.log(Cedula) */
  
  const FiltradoAsamblea = Asamblea.filter(Asamble => Asamble.Userid  === Cedula );
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
        <Link className="create-button" to='/Creacion'>Crear +</Link>
      </div>
      <div className='Content_Card'>
        <h2 className='fs-3'>Encuestas en curso</h2>
        <div className='content_Card_2'>
          {FiltradoAsamblea.map((asamblea) => (
            <Card_Home key={asamblea.id} id={asamblea.id} titulo={asamblea.Title} hora={asamblea.createdAt} color={asamblea.Color} />
           
          ))} 
        </div>
      </div>

    </div>
    </main>
    </div>
  );
};

export default Home;
