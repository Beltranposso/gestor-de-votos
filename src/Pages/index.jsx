import React from "react"
import ListUsers from "../app/ListUsers/listUsers"
import Home from "../app/home/Home"
import Create_User from "../app/createUser/Content"
import UpdateUser from "../app/UpdateUser/UpdateUser"
import CreacionPlantilla from "../app/creacionPlantilla/CreacionPlantilla"
import Loby from '../app/loby/Looby'
import Login from '../app/Log/Login'
export { ListUsers, Home, Create_User, UpdateUser, CreacionPlantilla, Loby, Login }




export const listUsers = React.lazy(() => import('../app/ListUsers/listUsers'))
export const home = React.lazy(() => import('../app/home/Home'))
export const create_User = React.lazy(() => import('../app/createUser/Content'))
export const updateUser = React.lazy(() => ('../app/UpdateUser/UpdateUser'))
export const creacionPlantilla = React.lazy(() => ('../app/creacionPlantilla/CreacionPlantilla'))
export const loby = React.lazy(() => ('../app/loby/Looby'))
export const login = React.lazy(() => ('../app/Log/Login'))





