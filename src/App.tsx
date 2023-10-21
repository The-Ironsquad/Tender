import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SelectPage from './pages/Select';

import './App.css';

import { AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [route, setRoute] = useState('Home');

  const pageRoutingHandler = (page: string) => {
    setRoute(page);
    setShowNav(false);
  };

  return (
    <>
      <AnimatePresence>
        {showNav && (
          <Navbar onClose={setShowNav} onSelect={pageRoutingHandler} />
        )}
      </AnimatePresence>
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        className="menu-icon"
        onClick={() => setShowNav(true)}
      />
      {route === 'Home' && <Home />}
      {route === 'SelectPage' && <SelectPage />}
    </>
  );
}
