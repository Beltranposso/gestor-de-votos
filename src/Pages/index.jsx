import React from "react"
import ListUsers from "../Components/listUsers"
import Home from "../Components/Home"
export {ListUsers,Home}



export  const listUsers = React.lazy(()=>import('../Components/listUsers'))
export const home = React.lazy(()=> import ('../Components/Home'))