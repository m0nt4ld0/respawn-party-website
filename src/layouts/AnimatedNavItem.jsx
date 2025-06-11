import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './AnimatedNavItem.css';

function AnimatedNavItem({ to, icon: Icon, label, hovered }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <li className="nav-item animated-nav-item d-flex justify-content-center">
      <NavLink className="nav-link d-flex align-items-center justify-content-center text-center" to={to}>
        <motion.div
          className="icon-wrapper"
          initial={{ x: 0 }}
          animate={hovered && !isMobile ? { x: -5 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </motion.div>

        {/* En mobile, mostrar siempre el label */}
        {isMobile ? (
          <span className="nav-label">
            {label}
          </span>
        ) : (
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="nav-label"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  opacity: { duration: 0.15 },
                  x: { duration: 0.15 },
                  when: "beforeChildren",
                }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        )}
      </NavLink>
    </li>
  );
}

export default AnimatedNavItem;