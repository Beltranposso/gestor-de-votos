import React from "react"
import ListUsers from "../Components/listUsers"
import Home from "../Components/Home"
import Create_User from "../Components/CreateUser"
import UpdateUser from "../Components/UpdateUser"
export {ListUsers,Home,Create_User,UpdateUser}



export  const listUsers = React.lazy(()=>import('../Components/listUsers'))
export const home = React.lazy(()=> import ('../Components/Home'))
export const create_User = React.lazy (()=>import ('../Components/CreateUser'))
export const updateUser = React.lazy (( ) => ('../Components/UpdateUser'))

