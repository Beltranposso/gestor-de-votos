import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoter =({
    canActive,
    redirect= '/H'
    
}) =>{

    if(!canActive){
        return <Navigate  to={redirect} replace />
        
    }
    return <Outlet/>
    
}
export default ProtectedRoter 