import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function AnimatedNavItem({ to, icon: Icon, label }) {
  const [hovered, setHovered] = useState(false);

  return (
    <li className="nav-item">
      <NavLink
        className="nav-link d-flex align-items-center"
        to={to}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ width: "auto", overflow: "hidden", whiteSpace: "nowrap" }}
      >
        <motion.div
          animate={{ x: hovered ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="me-1"
        >
          <Icon size={20} />
        </motion.div>

        <motion.div
          className="d-flex"
          style={{ overflow: "hidden" }}
          initial={false}
        >
          {hovered &&
            label.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
        </motion.div>
      </NavLink>
    </li>
  );
}
