const Card_Home = ({titulo,hora,color}) => {
    
    return (
        <div className="Card_Home"  >
             <div className="Card_Img" style={{ backgroundColor: color }}>
             <img src="" alt="" />
             </div>
             <div className="Card_Text">
            <h4 className="fs-5">{titulo}</h4>
            <h5 className="fs-6">Abierto {hora}  P.m</h5>
             </div>
        </div>
    );
};

export default Card_Home;