import React, { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Card_Home from './Card_votacion';
import axios from 'axios'

const Home = () => {
  const [cards, setCards] = useState([
  
  ]);

  const URI = 'http://localhost:8000/card/';

  
  const getCard = async () => {
    const response = await axios.get(URI);
    setCards(response.data);
  };
  useEffect(() => {
   getCard();
     
  }, []);

console.log(cards)
  return (
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
          {cards.map((card) => (
            <Card_Home key={card.id} titulo={card.Title} hora={card.createdAt} color={card.Color} />
           
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
