
import { useEffect, useState } from 'react';
import '/src/App.css';
import {  Link } from 'react-router-dom';

import { jwtDecode } from "jwt-decode"
import logo from '/src/assets/img/Control-360.png'; 
const Header= ({Component})=>{
  const [State, Setstate] = useState(true);

  const setvisible = () => {
    Setstate(!State);
  }
  
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  let nombre = decoded.Nombre

  
return(
  
       <div className='h-screen'>
      <header className='cabezera'>
        <div className='div_header'>
          {/* <button className='bottun_Aside' onClick={setvisible} >
            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button> */}

          <Link to="/Home"> 
            <img src={logo} alt="Control 360 Logo" className="header-logo" />
          </Link>
          <Link className='link_Aside' to='/Home'>
               Home
         </Link>
         <Link className='link_Aside' to="/listUsers">
         Usuarios registrados
        </Link>
        <Link className='link_Aside' to='/createUser'>
                 Crear Cuentas
        </Link>


        </div>
        <div className='div_header_2'>
          <h4>{nombre}</h4>
          <button className='bottun_Profile'>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </button>
          
        </div>



        <aside className='aside_21' style={State ? { left: '-300px' } : { left: '0px' }}>
          <div className='content_aside'>
            <ul className='lista_Aside'>
              <li>
                <Link className='link_Aside' to='/Home'>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-home">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>Home
                </Link>
              </li>
              <li>
                <Link className='link_Aside' to="/listUsers">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>Lista de usuarios registrados
                </Link>
              </li>
              <li>
                <Link className='link_Aside' to='/createUser'>
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                  </svg>Crear Cuentas
                </Link>
              </li>
            </ul>
          </div>
        </aside>


      </header>
       <main className='flex justify-center items-center  h-full bg-[#E6E6E6] '>
       { Component }
       </main>
       </div>
    
   
 
)

}

export default Header