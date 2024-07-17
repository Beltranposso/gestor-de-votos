import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card_Home from './Card_votacion';

const Home = () => {
  const [cards, setCards] = useState([
    { titulo: "Titulo_1", hora: "22:00", color: "#FFE8A3" },
    { titulo: "Titulo_2", hora: "13:00", color: "green" },
    { titulo: "Titulo_2", hora: "13:00", color: "red" },
    { titulo: "Titulo_2", hora: "13:00", color: "Blue" },
  ]);

  const addCard = (newCard) => {
    setCards([...cards, newCard]);
  };

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
          {cards.map((card, index) => (
            <Card_Home key={index} titulo={card.titulo} hora={card.hora} color={card.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
