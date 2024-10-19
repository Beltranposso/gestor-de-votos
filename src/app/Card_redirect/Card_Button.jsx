
import React from 'react';
import './Card_Button.css';
import { Link } from 'react-router-dom';

const Card_Button = () => {
  return (
    <Link className='button_card'>
      <div className='img'>
      <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
  <path d="M4 16v2a2 2 0 0 0 2 2h2" />
  <path d="M16 4h2a2 2 0 0 1 2 2v2" />
  <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
</svg>
        
        </div>     
    </Link>
  );
};

export default Card_Button;
