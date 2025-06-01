import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import {
  GiShoppingCart,
  GiGamepad,
} from "react-icons/gi";
import {
  MdEmail,
} from "react-icons/md";
import {
  FaUser,
  FaUserCog,
  FaUsers,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
} from "react-icons/fi";

import AnimatedNavItem from './AnimatedNavItem';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const leaveTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeoutRef.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, 600);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-dark px-3 py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container-fluid">

        <NavLink className="navbar-brand" to="/">
          <img src="/images/Logo.png" alt="Logo Talento Games" className="logo-navbar" />
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">

            <ul className="navbar-nav mx-auto text-center gap-3 my-3 my-lg-0">
              <AnimatedNavItem to="/" icon={FiHome} label="Inicio" hovered={hovered} />
              <AnimatedNavItem to="/about-us" icon={FaUsers} label="Nosotros" hovered={hovered} />
              <AnimatedNavItem to="/consoles" icon={GiGamepad} label="Juegos" hovered={hovered} />
              <AnimatedNavItem to="/faq" icon={FaQuestionCircle} label="Preguntas" hovered={hovered} />
              <AnimatedNavItem to="/contact-us" icon={MdEmail} label="Contacto" hovered={hovered} />
              <AnimatedNavItem to="/shopping-cart" icon={GiShoppingCart} label="Carrito" hovered={hovered} />
              {isAuthenticated && (
                <AnimatedNavItem to="/user" icon={FaUser} label="Mi Perfil" hovered={hovered} />
              )}
              {isAuthenticated && isAdmin && (
                <AnimatedNavItem to="/admin" icon={FaUserCog} label="Admin" hovered={hovered} />
              )}
            </ul>

            <div className="d-flex justify-content-center justify-content-lg-end">
              <Button
                variant={isAuthenticated ? "outline-danger" : "outline-primary"}
                size="sm"
                onClick={handleAuthClick}
              >
                {isAuthenticated ? (
                  <>
                    <FiLogOut className="me-1" /> Cerrar sesión
                  </>
                ) : (
                  <>
                    <FaUser className="me-1" /> Ingresar
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
