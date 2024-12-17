
import React, { useEffect,useState } from 'react';  
import { use } from 'react';

const Profile = ({Name, Cargo}) => {


    const [color, setColor] = useState('');
    // Split the name and take the first word
    const firstName = Name.split(' ')[0];
useEffect(() => {
    if(Cargo === 'Administrador'){
        setColor('bg-blue-400')
    }else if (Cargo === 'Coordinador'){
        setColor('bg-green-500')
    }
},[])




    return (
        <div className="flex gap-3 h-14 bg-white items-center rounded-md pl-2">
            <div className={`h-11 w-11 rounded-lg flex justify-center items-center text-lg ${color}`}>
                {firstName.charAt(0).toUpperCase()}
            </div>
            <div className='flex flex-col font-sans font-bold'>
                <p className="">{firstName}</p>
                <p className="text-sm">{Cargo}</p>
            </div>
        </div>
    );
}

export default Profile;