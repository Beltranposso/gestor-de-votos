import { useParams } from "react-router-dom";
import { Create_User, Home, ListUsers, UpdateUser,CreacionPlantilla} from "./Pages";


export  const routes = [
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

    }
   
]