import React from 'react';
import { Outlet } from 'react-router-dom';

const MainDashboard = ({children}) => {
    return (
        
          <div className='w-full h-full'>
             {children}

            <Outlet />

          </div>   
    );
};

export default MainDashboard;