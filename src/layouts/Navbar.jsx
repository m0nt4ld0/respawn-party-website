import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top w-100 navbar-light bg-light px-4">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="navbar-brand" to="/">Respawn Party</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ps-5">PlayStation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projector-1080p">Nintendo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/multigame">Arcade (Fichines)</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">Preguntas frecuentes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
