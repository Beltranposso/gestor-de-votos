import { Link } from "react-router-dom";
import { Users, Calendar, MapPin, Users2 } from 'lucide-react';
import React from "react";
const Card_Home = ({id,
    titulo,
    hora,
    color
    ,name,
    date,
    location,
    attendees,
    imageUrl,
    onClick,}) => {
    
        const [imageError, setImageError] = React.useState(false);
        

    return (



      <div className="flex w-full justify-center items-center">
        <Link to={`/Home/Cardinfo/${id}`}  className="w-5/6 ">
              <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <div className="aspect-video w-full overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform transition-transform duration-300 group-hover:scale-110">
              <Users2 className="h-20 w-20 text-blue-400 mx-auto mb-2" strokeWidth={1.5} />
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Asamblea</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{attendees} asistentes</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </div>
    
          
        </Link>
        </div>
    );
};

export default Card_Home;