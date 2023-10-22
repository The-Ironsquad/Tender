import { FC } from 'react';
import styles from './Navbar.module.css';

import { motion } from 'framer-motion';

type PropsType = {
  selected: string;
  onClose: (condition: boolean) => void;
  onSelect: (page: string) => void;
};

const Navbar: FC<PropsType> = ({ selected, onClose, onSelect }) => {
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
          <li
            onClick={() => onSelect('HomePage')}
            className={selected === 'HomePage' ? styles.selected : ''}
          >
            Home
          </li>
          <li
            onClick={() => onSelect('SelectPage')}
            className={selected === 'SelectPage' ? styles.selected : ''}
          >
            Select
          </li>
          <li
            onClick={() => onSelect('ListPage')}
            className={selected === 'ListPage' ? styles.selected : ''}
          >
            Your List
          </li>
          <li
            onClick={() => onSelect('RefinePage')}
            className={selected === 'RefinePage' ? styles.selected : ''}
          >
            Refine
          </li>
          <li
            onClick={() => onSelect('CookPage')}
            className={selected === 'CookPage' ? styles.selected : ''}
          >
            Cook
          </li>
        </ul>
      </motion.nav>
      <div className={styles.modal} onClick={closeNavHandler}></div>
    </>
  );
};

export default Navbar;
