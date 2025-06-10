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
      <div className="container-fluid d-flex align-items-center flex-nowrap justify-content-between">
        <NavLink className="navbar-brand me-3 flex-shrink-0" to="/">
          <img src="/images/Logo.webp" alt="Logo Talento Games" className="logo-navbar" />
        </NavLink>

        <div className="collapse navbar-collapse flex-grow-1" id="navbarNav">
          <div className="d-flex align-items-center w-100 flex-nowrap gap-2">
            <AnimatePresence initial={false}>
              {!searchActive && (
                <motion.ul
                  key="nav-items"
                  className="navbar-nav mx-auto text-center gap-3 my-3 my-lg-0 d-flex flex-row flex-nowrap align-items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                  className="flex-grow-1 position-relative z-3"
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
                className="flex-shrink-0"
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
