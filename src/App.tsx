import { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [showNav, setShowNav] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showNav && <Navbar onClose={setShowNav} />}
      </AnimatePresence>
      <h1 onClick={() => setShowNav(true)}>Tender</h1>
      <h2>Your next recipe is just a moment away!</h2>
    </>
  );
}
