import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoter =({
    canActive,
    redirect= '/'
    
}) =>{

    if(!canActive){
        return <Navigate  to={redirect} replace />
        
    }
    return <Outlet/>
    
}
export default ProtectedRoter 