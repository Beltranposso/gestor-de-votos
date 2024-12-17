import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const SessionStatus = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://serverapivote.co.control360.co/check-session', {
          withCredentials: true, // Asegúrate de enviar las cookies
        });

        // Si la sesión está activa, actualiza el estado
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          // Si no está autenticado, redirige al login
          setIsAuthenticated(false);
          // Verifica si ya se hizo la recarga una vez
          if (!localStorage.getItem('sessionChecked')) {
            localStorage.setItem('sessionChecked', 'true'); // Marca como que se hizo la verificación
            window.location.reload(); // Recarga la página una sola vez
          }
        }
      } catch (error) {
        console.error('Error al verificar la sesión:', error);
        setIsAuthenticated(false);
        // Verifica si ya se hizo la recarga una vez
        if (!localStorage.getItem('sessionChecked')) {
          localStorage.setItem('sessionChecked', 'true'); // Marca como que se hizo la verificación
          window.location.reload(); // Recarga la página una sola vez
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Verifica la sesión al cargar el componente
    checkSession();

    // Configura un intervalo para verificar la sesión cada 3 horas
    const interval = setInterval(() => {
      checkSession();
    }, 10800000); // 3 horas en ms

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
                children
      ) : (
     <Navigate to="/login" />
      )}
    </div>
  );
};

export default SessionStatus;
