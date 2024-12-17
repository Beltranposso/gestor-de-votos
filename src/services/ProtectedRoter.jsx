import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null); // Almacena el rol del usuario
  const [isLoading, setIsLoading] = useState(true); // Indica si estamos cargando la validación
  const [isAuthorized, setIsAuthorized] = useState(false); // Define si el usuario está autorizado

  useEffect(() => {

    // Realizamos la solicitud al backend para validar el token y obtener el rol
    axios.get('https://serverapivote.co.control360.co/get-user-info', { withCredentials: true })
      .then(response => {
        const { Cargo } = response.data;
         // El backend devuelve el rol del usuario
        setUserRole(Cargo);
       
        setIsAuthorized(allowedRoles.includes(Cargo));
        const C = btoa(Cargo);
       localStorage.setItem('C', C); // Comprobamos si el rol está permitido
      })
      .catch(error => {
        console.error('Error al obtener la información del usuario:', error);
        setIsAuthorized(false); // No autorizado si hay un error
      })
      .finally(() => {
        setIsLoading(false); // Terminamos de cargar
      });
     
    }, []);


  if (isLoading) {
    return <div>Loading...</div>; // Mostrar un indicador mientras cargamos
  }

  if (!isAuthorized) {
    return (<Navigate to={'/login'}></Navigate>
    ) // Redirigir si no está autorizado
  }

  return children; // Renderizar la ruta protegida si está autorizado
};

export default ProtectedRoute;
