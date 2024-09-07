import { useParams } from "react-router-dom";
import { Create_User, Home, ListUsers, UpdateUser,CreacionPlantilla,Loby, Home_1, Validation,Formulario, } from "./Pages";



export  const routes = [
        
    {
        path: '/',
        component:<p>Control 360</p>
    },
    {
        path: '/Home',
        component: <Home></Home>
    },
    {
        path: '/listUsers',
        component: <ListUsers></ListUsers>
    },
    {
        path: '/listUsers/Create',
        component: <Create_User></Create_User>
    },{
        path: "/listUsers/UpdateUser/:id",
        component: <UpdateUser></UpdateUser>
    },{
       path: "/Creacion",
       component: <CreacionPlantilla></CreacionPlantilla>

    },{
        path: '/loby',
        component: <Loby></Loby>
    },
   
    {
        path: '/Validation',
        component: <Validation></Validation>
    },{
        path: '/Formulario',
        component:<Formulario></Formulario>

    }/* ,{
        path: '/Login',
        component: <Login></Login>
    }
 */
   
]