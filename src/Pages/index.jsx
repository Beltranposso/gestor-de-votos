import React from "react"
import ListUsers from "../Components/listUsers"
import Home from "../Components/Home"
import Create_User from "../Components/CreateUser"
import UpdateUser from "../Components/UpdateUser"
import CreacionPlantilla from "../Components/CreacionPlantilla"
import Loby from '../Components/loby/Looby'
import Home_1 from '../Components/Hme'
import Validation from '../Components/user/validation'
import Formulario from '../Components/user/form'
import Login from '../Components/Log/Login'
export { ListUsers, Home, Create_User, UpdateUser, CreacionPlantilla, Loby, Home_1, Validation,Formulario,Login}




export const listUsers = React.lazy(() => import('../Components/listUsers'))
export const home = React.lazy(() => import('../Components/Home'))
export const create_User = React.lazy(() => import('../Components/CreateUser'))
export const updateUser = React.lazy(() => ('../Components/UpdateUser'))
export const creacionPlantilla = React.lazy(() => ('../Components/CreacionPlantilla'))
export const loby = React.lazy(() => ('../Components/loby/Looby'))
export const home_1 = React.lazy(() => ('../Components/hme'))
export const validation = React.lazy(() => ('../Components/user/validation'))
export const formulario = React.lazy(() => ('../Components/user/form'))
export const login = React.lazy(() => ('../Components/Log/Login'))





