import './Validation.css'
import Button from 'react-bootstrap/Button';
import Footer from '../footer/footer'
const Validation = () => {
  return (
    <div className="validation">
      {/*   <img  className='img_control' src="/src/assets/img/control 360(gestion de votos) (1).png" alt="" width={600} height={300}/> */}
      <div className='img_content'>
        <img src="/src/assets/img/file.png" alt="" width={450} height={200} />
      </div>
      <div className='formValidation'>
        <form className='form' action="">
          <div className="input-container">
            <input type="text" id="input" required="" placeholder='Cedula:' />

          </div>
          <div className='cotenedor_buton'>

            <Button variant="info" className='buton'>Entrar</Button>
          </div>
        </form>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Validation;