import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import ProtectedRoute from './services/ProtectedRoter'; // Asegúrate de que la ruta esté correcta
import CardInfo from './app/Card_redirect/Card _redi';
import Login from './app/Log/Login';
import MainDash from './components/comon/MainDashboard';
import ListUserDash from './components/comon/UsuariosCardinfo';
import CreateUser from './components/create';
import HomeOp from './app/HomeOperador/Home'
import Home from './app/home/content';
import { FormAsamblea, Loby } from './pages';
import MainAdmin from './app/MainAdmin';
import MainOpr from './app/MainOpr';
import Layaut from './components/layouts/Header'
import OperadorUser from './app/OprUserAsistencia/UserAsistencia';
import CreateVotacion from './app/CreateEncuesta/Createencuesta'
import SessionStatus from './services/SecionStatus';
import MainCoordi from './app/MainCoordi';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

 


  return (
    <BrowserRouter>
         
    <div className='w-full h-full'>

    
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para Administrador */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['Administrador']}>
              <Suspense fallback={<div>Loading...</div>}>
                <MainAdmin>
                  <Routes>
          <Route path="AsambleaControl" element={<Home />} />
          <Route path="loby/:id" element={<Loby />} />
          <Route path="Creacion" element={<FormAsamblea />} />
          <Route path="Cardinfo/:id" element={<CardInfo />}>
            <Route path="Dashboard" element={<MainDash />} />
            <Route path="listUsers" element={<ListUserDash />} />
            <Route path="Create" element={<CreateUser />} />
            <Route path="CreateVotacion" element={<CreateVotacion></CreateVotacion>} />
          </Route>

          </Routes>

                </MainAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        >
          {/* Subrutas dentro de /admin */}

        </Route>
        {/* Ruta protegida para Coordinador */}
        <Route
          path="/coordi/*"
          element={
            <ProtectedRoute allowedRoles={['Coordinador']}>
           <Suspense fallback={<div>Loading...</div>}>
                <MainAdmin>
                  <Routes>
          <Route path="AsambleaControl" element={<Home />} />
          <Route path="loby/:id" element={<Loby />} />
          <Route path="Creacion" element={<FormAsamblea />} />
          <Route path="Cardinfo/:id" element={<CardInfo />}>
            <Route path="Dashboard" element={<MainDash />} />
            <Route path="listUsers" element={<ListUserDash />} />
            <Route path="Create" element={<CreateUser />} />
            <Route path="CreateVotacion" element={<CreateVotacion></CreateVotacion>} />
          </Route>

          </Routes>

                </MainAdmin>
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para Operador de Registro */}
        <Route
          path="/operator/*"
          element={
            <ProtectedRoute allowedRoles={['Operador de registro']}>    

            <Suspense fallback={<div>Loading...</div>}>
                 <MainOpr>
                <Routes>
                 <Route path="AsambleaControl" element={<HomeOp />} />
                 <Route path="Users/:id" element={<Layaut Component={<OperadorUser></OperadorUser>}></Layaut>}/>

                </Routes>
                 </MainOpr>
            </Suspense>
              
            </ProtectedRoute>
          }
        >    
        </Route>

          
      

        {/* Ruta de acceso denegado */}
       
      </Routes>

     

      </div>
    </BrowserRouter>
  );
}

export default App;
