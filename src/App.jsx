
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { routes } from './routerConfig';
import Proted from '../src/services/ProtectedRoter'
import CardInfo from './app/Card_redirect/Card _redi'
import Login from '../src/app/Log/Login'
/* import CardInfo from '../src/Components/Card_redirect/Card _redi' */

function App() {
/*   const [token] = useLocalStorage('token'); // No es necesario usar `setToken` aquí
 console.log(token) */
  const response = localStorage.getItem('token')
  console.log(response)
 
  return (
    <BrowserRouter >
      <div className='App'>
          <Routes>
           
            <Route   element={<Proted canActive={response} redirectpath='/login'/>}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            
            </Route>
            <Route  path='/Login'  element={<Login/>}/>
             <Route  path='/Home/Cardinfo/:id'  element={<CardInfo/>}/> 
          </Routes>
          </div>  
           
    </BrowserRouter>
  );
}

export default App;
