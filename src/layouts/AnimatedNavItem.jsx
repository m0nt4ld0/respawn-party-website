import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimatedNavItem.css';

function AnimatedNavItem({ to, icon: Icon, label, hovered }) {
  return (
    <li className="nav-item animated-nav-item">
      <NavLink className="nav-link d-flex align-items-center" to={to}>
        <motion.div
          className="icon-wrapper"
          initial={{ x: 0 }}
          animate={hovered ? { x: -5 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </motion.div>

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
      </NavLink>
    </li>
  );
}

export default AnimatedNavItem;
