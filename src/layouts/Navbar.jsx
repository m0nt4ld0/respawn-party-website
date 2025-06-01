import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { GiShoppingCart, GiGamepad } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaUser, FaUsers, FaQuestionCircle } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import AnimatedNavItem from './AnimatedNavItem';


import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
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
            <AnimatedNavItem to="/" icon={FiHome} label="Inicio" />
            <AnimatedNavItem to="/about-us" icon={FaUsers} label="Nosotros" />
            <AnimatedNavItem to="/consoles" icon={GiGamepad} label="Juegos" />
            <AnimatedNavItem to="/faq" icon={FaQuestionCircle} label="FAQ" />
            <AnimatedNavItem to="/contact-us" icon={MdEmail} label="Contacto" />
            <AnimatedNavItem to="/shopping-cart" icon={GiShoppingCart} label="Carrito" />
            {isAuthenticated && (
              <AnimatedNavItem to="/user" icon={FaUser} label="Mi Perfil" />
            )}


            <li className="nav-item d-flex align-items-center">
              <Button
                variant={isAuthenticated ? "outline-danger" : "outline-primary"}
                size="sm"
                onClick={handleAuthClick}
              >
                {isAuthenticated ? (
                  <>
                    <FiLogOut className="me-1" />
                    Cerrar sesión
                  </>
                ) : (
                  <>
                    <FaUser className="me-1" />
                    Ingresar
                  </>
                )}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
