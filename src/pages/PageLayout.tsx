import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './PageLayout.module.css';
import Navbar from '../components/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { AnimatePresence } from 'framer-motion';

const PageLayout = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showNav && <Navbar onClose={setShowNav} />}
      </AnimatePresence>
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        className={styles['menu-icon']}
        onClick={() => setShowNav(true)}
      />
      <Outlet />
    </>
  );
};

export default PageLayout;
