import { useState } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SelectPage from './pages/Select';

import './App.css';

import { AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

export default function App() {
  const [showNav, setShowNav] = useState(true);
  const [route, setRoute] = useState('Home');

  return (
    <>
      <AnimatePresence>
        {showNav && <Navbar onClose={setShowNav} onSelect={setRoute} />}
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
