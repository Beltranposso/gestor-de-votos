import { Link } from "react-router-dom";

const Card_Home = ({id,titulo,hora,color}) => {
    


    return (
        <Link to={`/Home/Cardinfo/${id}`}  className="Card_Home">
      
    
             <div className="Card_Img" style={{ backgroundColor: color }}>
                <img src="" alt="" />
                </div>
                <div className="Card_Text">
                <h4 className="fs-5">{titulo}</h4>
                <h5 className="fs-6">Abierto {hora}</h5>
            </div>
        </Link>
    );
};

export default Card_Home;