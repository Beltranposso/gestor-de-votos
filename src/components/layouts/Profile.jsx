
import React from 'react';

const Profile = ({}) => {
    return (
        <div className="flex gap-3 h-14 bg-white  items-center rounded-md pl-2  ">
            
            <img src="https://i.pravatar.cc/150?img=12"  className="h-11 w-11 rounded-lg" />

          
            <div className='flex  flex-col font-sans font-bold'>               
            <p className=" ">Alejandro  </p>
            <p className="text-sm ">Admin</p>
            </div>          
        </div>
    );
}
 
export default Profile;