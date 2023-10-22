import { useState } from 'react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SelectPage from './pages/SelectPage';

import './App.css';

import { AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import ListPage from './pages/ListPage';

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [route, setRoute] = useState('HomePage');

  const [acceptedList, setAcceptedList] = useState<string[][]>([]);
  const [rejectedList, setRejectedList] = useState<string[]>([]);

  const pageRoutingHandler = (page: string) => {
    setRoute(page);
    setShowNav(false);
  };

  const acceptRecipeHandler = (id: string, title: string) => {
    setAcceptedList((previousState) => [...previousState, [id, title]]);
  };

  const rejectRecipeHandler = (id: string) => {
    setRejectedList((previousState) => [...previousState, id]);
  };

  return (
    <>
      <AnimatePresence>
        {showNav && (
          <Navbar
            selected={route}
            onClose={setShowNav}
            onSelect={pageRoutingHandler}
          />
        )}
      </AnimatePresence>
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        className="menu-icon"
        onClick={() => setShowNav(true)}
      />
      {route === 'HomePage' && <HomePage onSelect={pageRoutingHandler} />}
      {route === 'SelectPage' && (
        <SelectPage
          rejectedList={rejectedList}
          onReject={rejectRecipeHandler}
          onAccept={acceptRecipeHandler}
        />
      )}
      {route === 'ListPage' && <ListPage selectedList={acceptedList} />}
    </>
  );
}
