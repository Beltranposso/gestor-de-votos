import './form.css'
import Footer from '../footer/footer'
import Button from 'react-bootstrap/Button';

const Form = () => {


   return (

      <div className="Content">
         <header>
            <img className='' src="/src/assets/img/file.png" width={200} height={100} />
         </header>
         <main className='mainForm'>
            <div className='formulario'>
               <div className='Formulario_2'>
                  <div className='footer_content'>
                     <h3>Votacion 1</h3>
                     <div className='linea'></div>
                     <h5>Pregunta</h5>
                  </div>
                  <div className='options'>
                     <div className='option_1'>

                        <input className='inputRadio' type="radio" />
                        <p>pregunta1</p>
                     </div>
                     <div className='option_2'>
                        <input className='inputRadio' type="radio" />
                        <p>pregunta2</p>
                     </div>

                  </div>

               </div>

            </div>

         </main>
         <div className='buttun_enviar'>
            <Button  className='buttunEnviar' variant="primary">Enviar</Button>
         </div>
         <footer>
            <Footer></Footer>
         </footer>

      </div>

   )
}


export default Form;    