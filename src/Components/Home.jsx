import React from 'react';
import Card_Home from './Card_votacion';


const Home = () => {
  


  return (
    <div className="Home">
      
      
      <div className="search-bar_Home">
        <div>
        <input className='input_text_buscar' type="text" placeholder="Buscar" />
        <span className="filter-icon">A-Z</span>
        </div>
       
        <button className="create-button   ">Crear +</button>
      </div>
      <div className='Content_Card'>
        <h2 className='fs-3'>Encuestas en curso</h2>
          <div  className='content_Card_2'>

            <Card_Home titulo={"Titulo_1"} hora={"22:00"} color={"#FFE8A3"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
            <Card_Home titulo={"Titulo_2"} hora={"13:00"} color={"#14AE5C"}></Card_Home>
  

          
           
           
           
          </div>
     
     
      </div>
  
      </div>
    
  );
};

export default Home;