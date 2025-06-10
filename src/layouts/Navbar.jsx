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
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="container-fluid d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
          {/* Fila solo para móviles */}
          <div className="d-flex d-lg-none w-100 align-items-center justify-content-between mb-2 position-relative">
            <Button
              className="btn btn-outline-light"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Menú"
            >
              <span style={{ fontSize: '1.5rem' }}>☰</span>
            </Button>

            {/* Logo centrado absolutamente */}
            <NavLink to="/" className="position-absolute start-50 translate-middle-x">
              <img src="/images/Logo.webp" alt="Logo Talento Games" className="logo-navbar" />
            </NavLink>
            <div style={{ width: '2.5rem' }} />
          </div>

          {/* Logo para pantallas grandes */}
          <NavLink
            to="/"
            className="d-none d-lg-block me-auto"
            style={{ height: '40px' }}
          >
            <img
              src="/images/Logo.webp"
              alt="Logo Talento Games"
              className="logo-navbar"
              style={{ height: '100%', objectFit: 'contain' }}
            />
          </NavLink>


        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">

          <div className="d-flex flex-column flex-lg-row align-items-center w-100 gap-2">
          <AnimatePresence initial={false}>
            {(!searchActive && (menuOpen || window.innerWidth >= 992)) && (
              <motion.ul
                key="nav-items"
                className="navbar-nav text-center gap-3 my-3 my-lg-0 d-flex flex-column flex-lg-row align-items-start align-items-lg-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedNavItem to="/" icon={FiHome} label="Inicio" hovered={hovered} />
                <AnimatedNavItem to="/about-us" icon={FaUsers} label="Nosotros" hovered={hovered} />
                <AnimatedNavItem to="/consoles" icon={GiGamepad} label="Juegos" hovered={hovered} />
                <AnimatedNavItem to="/faq" icon={FaQuestionCircle} label="Preguntas" hovered={hovered} />
                <AnimatedNavItem to="/contact-us" icon={MdEmail} label="Contacto" hovered={hovered} />
                <AnimatedNavItem
                  to="/shopping-cart"
                  label="Carrito"
                  hovered={hovered}
                  icon={() => (
                    <div className="d-flex align-items-center position-relative">
                      <GiShoppingCart size={20} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-1 py-0 cart-badge">
                        {totalItems}
                      </span>
                    </div>
                  )}
                />
                {isAuthenticated && (
                  <AnimatedNavItem to="/user" icon={FaUser} label="Mi Perfil" hovered={hovered} />
                )}
                {isAuthenticated && isAdmin && (
                  <AnimatedNavItem to="/admin" icon={FaUserCog} label="Admin" hovered={hovered} />
                )}
              </motion.ul>
            )}
          </AnimatePresence>


            <motion.button
              key="search-button"
              className="btn btn-outline-light d-flex align-items-center flex-shrink-0"
              onClick={toggleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BiSearch size={20} />
            </motion.button>

            <AnimatePresence>
              {searchActive && (
                <motion.div
                  key="search-bar"
                  className="position-relative z-3 w-100 mx-auto px-2"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <SearchBar inputRef={inputRef} autoFocus />
                </motion.div>
              )}
            </AnimatePresence>

            {!searchActive && (
              <motion.div
                key="auth-button"
                className="flex-shrink-0 mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant={isAuthenticated ? "outline-danger" : "outline-primary"}
                  size="sm"
                  onClick={handleAuthClick}
                  disabled={isLoggingOut}
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
