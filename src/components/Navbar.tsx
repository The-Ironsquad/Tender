import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

import { motion } from 'framer-motion';

type PropsType = {
  onClose: (condition: boolean) => void;
};

const Navbar: FC<PropsType> = ({ onClose }) => {
  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -150 }}
      >
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.selected : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/select"
              className={({ isActive }) => (isActive ? styles.selected : '')}
            >
              Select
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/list"
              className={({ isActive }) => (isActive ? styles.selected : '')}
            >
              Your List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/refine"
              className={({ isActive }) => (isActive ? styles.selected : '')}
            >
              Refine
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cook"
              className={({ isActive }) => (isActive ? styles.selected : '')}
            >
              Cook
            </NavLink>
          </li>
        </ul>
      </motion.nav>
      <div className={styles.modal} onClick={onClose.bind(null, false)}></div>
    </>
  );
};

export default Navbar;
