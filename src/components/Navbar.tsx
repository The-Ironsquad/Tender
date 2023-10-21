import { FC } from 'react';
import styles from './Navbar.module.css';

import { motion } from 'framer-motion';

type PropsType = {
  onClose: (condition: boolean) => void;
  onSelect: (page: string) => void;
};

const Navbar: FC<PropsType> = ({ onClose, onSelect }) => {
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
          <li onClick={() => onSelect('Home')}>Home</li>
          <li onClick={() => onSelect('SelectPage')}>Select</li>
          <li onClick={() => onSelect('RefinePage')}>Refine</li>
          <li onClick={() => onSelect('CookPage')}>Cook</li>
        </ul>
      </motion.nav>
      <div className={styles.modal} onClick={closeNavHandler}></div>
    </>
  );
};

export default Navbar;
