import '../css/Navbar.css'

const Navbar = ()=>{

    return (
        <>
        
        <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-light barra-navegacion ">
        
  <div className="container-fluid enlaces">
    {/* <a className="navbar-brand" href="!#">GAMR</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse items" id="navbarSupportedContent">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 links" >
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/"  >Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/proyectos">Proyectos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">Dashboard</a>
        </li>
        <li className="nav-item" style={{marginLeft:825}}>
          <a className="nav-link" href="/contactame">Contáctame</a>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
        </div>
        </>
    )
}

export default Navbar;