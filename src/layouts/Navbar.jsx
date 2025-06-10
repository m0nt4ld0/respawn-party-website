import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';

import { GiShoppingCart, GiGamepad } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaUser, FaUserCog, FaUsers, FaQuestionCircle } from "react-icons/fa";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

import AnimatedNavItem from './AnimatedNavItem';
import './Navbar.css';

function Navbar() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { cart } = useShoppingCart();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const leaveTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeoutRef.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHovered(false);
    }, 600);
  };

  const toggleSearch = () => {
    setSearchActive((prev) => !prev);
    if (!searchActive) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      try {
        setIsLoggingOut(true);
        navigate('/');
        setTimeout(async () => {
          try {
            await logout();
          } catch (error) {
            console.error('Error durante logout:', error);
          } finally {
            setIsLoggingOut(false);
          }
        }, 100);
      } catch (error) {
        console.error('Error durante logout:', error);
        setIsLoggingOut(false);
      }
    } else {
      navigate('/login');
    }
  };

  const totalItems = cart?.reduce((sum, item) => sum + item.cantidad, 0) || 0;

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-dark px-3 py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 1030 }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <NavLink className="navbar-brand" to="/">
          <img src="/images/Logo.webp" alt="Logo Talento Games" className="logo-navbar" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav d-flex flex-column w-100 text-center gap-2 mt-3">
          <li className="nav-item w-100">
            <NavLink to="/" className="nav-link text-light d-flex flex-column align-items-center">
              <FiHome size={20} />
              Inicio
            </NavLink>
          </li>
          <li className="nav-item w-100">
            <NavLink to="/about-us" className="nav-link text-light d-flex flex-column align-items-center">
              <FaUsers size={20} />
              Nosotros
            </NavLink>
          </li>
          <li className="nav-item w-100">
            <NavLink to="/consoles" className="nav-link text-light d-flex flex-column align-items-center">
              <GiGamepad size={20} />
              Juegos
            </NavLink>
          </li>
          <li className="nav-item w-100">
            <NavLink to="/faq" className="nav-link text-light d-flex flex-column align-items-center">
              <FaQuestionCircle size={20} />
              Preguntas
            </NavLink>
          </li>
          <li className="nav-item w-100">
            <NavLink to="/contact-us" className="nav-link text-light d-flex flex-column align-items-center">
              <MdEmail size={20} />
              Contacto
            </NavLink>
          </li>
          <li className="nav-item w-100 position-relative">
            <NavLink to="/shopping-cart" className="nav-link text-light d-flex flex-column align-items-center">
              <div className="position-relative">
                <GiShoppingCart size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-1 py-0">
                  {totalItems}
                </span>
              </div>
              Carrito
            </NavLink>
          </li>

          {isAuthenticated && (
            <li className="nav-item w-100">
              <NavLink to="/user" className="nav-link text-light d-flex flex-column align-items-center">
                <FaUser size={20} />
                Mi Perfil
              </NavLink>
            </li>
          )}
          {isAuthenticated && isAdmin && (
            <li className="nav-item w-100">
              <NavLink to="/admin" className="nav-link text-light d-flex flex-column align-items-center">
                <FaUserCog size={20} />
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* Barra de búsqueda: dropdown, input y botón, todos al 100% */}
        <div className="w-100 px-3 mt-3">
          <SearchBar inputRef={inputRef} autoFocus />
        </div>

        {/* Botón de login/logout debajo del search */}
        <div className="w-100 px-3 mt-3 mb-3">
          <Button
            variant={isAuthenticated ? "outline-danger" : "outline-primary"}
            onClick={handleAuthClick}
            disabled={isLoggingOut}
            className="w-100"
          >
            {isAuthenticated ? (
              <>
                <FiLogOut className="me-1" />
                {isLoggingOut ? 'Cerrando...' : 'Cerrar sesión'}
              </>
            ) : (
              <>
                <FaUser className="me-1" /> Ingresar
              </>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
