// archivo getRouteByRole.js

import axios from 'axios';

export const getRouteByRole = async () => {
    try {
        const response = await axios.get('http://localhost:8000/get-user-info', { withCredentials: true });

        if (response.status === 200) {
            const { Cargo } = response.data; // Extraemos el cargo del usuario

            // Dependiendo del cargo, devolvemos la ruta correspondiente
            if (Cargo === 'Operador') {
                return '/operator';
            } else if (Cargo === 'Coordinador') {
                return '/coordi';
            } else if (Cargo === 'Administrador') {
                return '/Admin';
            } else {
                throw new Error('Cargo no reconocido');
            }
        } else {
            throw new Error('No se pudo obtener la información del usuario');
        }
    } catch (err) {
        console.error(err.message);
        return err.message || 'Hubo un error al obtener los datos del usuario';
    }
};
