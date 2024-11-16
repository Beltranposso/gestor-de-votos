import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routerConfig';
import Proted from '../src/services/ProtectedRoter';
import CardInfo from './app/Card_redirect/Card _redi';
import Login from '../src/app/Log/Login';
import { useEffect, useState } from 'react';

function App() {
  // Establece el estado inicial con el valor del token almacenado en localStorage
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Usa useEffect para escuchar los cambios en localStorage y actualizar el estado
  useEffect(() => {
    // Función que se ejecuta cada vez que se modifica el localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };

    // Agrega el evento de escucha
    window.addEventListener('storage', handleStorageChange);

    // Limpia el evento de escucha cuando el componente se desmonte
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route element={<Proted canActive={token} redirectpath='/login' />}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Route>
          <Route path='/Login' element={<Login />} />
          <Route path='/Home/Cardinfo/:id' element={<CardInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
