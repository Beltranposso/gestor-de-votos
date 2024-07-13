import Data_User from "./Datauser"
export  default function listUsers (){
return(

      <div className="ContenedorUsers">
        <div className="share_Listuser"> 
        <h1>Usuarios Registrados</h1>
        <div className="search">
    <input type="text" className="search__input" placeholder="Buscar"/>
   
    
  {/*  <button class="search__button">
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
  <path d="M21 21l-6 -6" />
</svg>
    </button> */}
   
</div>
        </div>
         <div className="Data_User">
           <h3>ID</h3>
           <h3>Nombre</h3>
           <h3>Apellido</h3>
           <h3>Correo</h3>
           <h3>C.C</h3>
           <h3>P.Adquisitivo</h3>
           <h3>N.apto</h3>
           <h3>Usuario</h3>
        </div> 
            <Data_User></Data_User>
      </div> 

)
}