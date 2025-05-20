import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Navbar.css';

function Navbar({ logueado, setLogueado }) {
  const handleLoginClick = () => {
    setLogueado(!logueado);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top w-100 navbar-light px-4">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="navbar-brand" to="/">
                <img src="/images/Logo.png" alt="Logo Talento Games" className="logo-navbar" />
              </NavLink>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about-us">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/consoles">Juegos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/faq">Preguntas frecuentes</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact-us">Contacto</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/shopping-cart">Carrito</NavLink></li>
            <li className="nav-item d-flex align-items-center">
              <Button variant={logueado ? "outline-danger" : "outline-primary"} size="sm" onClick={handleLoginClick}>
                {logueado ? "Cerrar sesión" : "Ingresar"}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
