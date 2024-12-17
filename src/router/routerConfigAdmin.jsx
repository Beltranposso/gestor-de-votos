import { useParams } from "react-router-dom";
import { Create_User, Home, ListUsers, UpdateUser,CreacionPlantilla,Loby,FormAsamblea } from "./pages";



export  const routes = [
        
    {
        path: '/',
        component:<p>Control 360.......</p>
    },
    {
        path: '/h',
        component: <Home></Home>
    },
    {
        path: '/listUsers',
        component: <ListUsers></ListUsers>
    },
{
        path: "/listUsers/UpdateUser/:id",
        component: <UpdateUser></UpdateUser>
    },{
       path: "/Creacion",
       component: <FormAsamblea></FormAsamblea>

    },{
        path: '/loby/:id',
        component: <Loby></Loby>
    }
   
   
   
]