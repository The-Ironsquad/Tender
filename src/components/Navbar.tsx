import { FC } from 'react';
import styles from './Navbar.module.css';

import { motion } from 'framer-motion';

type PropsType = {
  onClose: (condition: boolean) => void;
};

const Navbar: FC<PropsType> = ({ onClose }) => {
  const closeNavHandler = () => {
    onClose(false);
  };

  return (
    <>
      <motion.nav
        className={styles.navbar}
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -150 }}
      >
        <ul className={styles.list}>
          <li>Home</li>
          <li>Select</li>
          <li>Refine</li>
          <li>Cook</li>
        </ul>
      </motion.nav>
      <div className={styles.modal} onClick={closeNavHandler}></div>
    </>
  );
};

export default Navbar;
