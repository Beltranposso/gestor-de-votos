
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { routes } from './routerConfig';
import Proted from './ProtectedRoter'
import logo from './assets/img/Control-360.png'; 
import Login from './Components/Log/Login'


function App() {
/*   const [token] = useLocalStorage('token'); // No es necesario usar `setToken` aquí
 console.log(token) */
  const response = localStorage.getItem('token')
 
  return (
    <BrowserRouter>
        
          <Routes>
            <Route   element={<Proted canActive={response} redirectpath='/login'/>}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            </Route>
            <Route  path='/Login'  element={<Login></Login>}/>
          </Routes>
       
  
    </BrowserRouter>
  );
}

export default App;
