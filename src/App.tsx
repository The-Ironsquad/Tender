import { useState } from 'react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SelectPage from './pages/SelectPage';
import ListPage from './pages/ListPage';
import CookPage from './pages/CookPage';

import './App.css';

import { AnimatePresence } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import RefinePage from './pages/RefinePage';

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [route, setRoute] = useState('HomePage');

  const [acceptedList, setAcceptedList] = useState<string[][]>([]);
  const [rejectedList, setRejectedList] = useState<string[]>([]);

  const [selected, setSelected] = useState<string>('');

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

  const removeRecipeHandler = (removeId: string) => {
    setAcceptedList((preciousState) =>
      preciousState.filter(([id]) => id !== removeId)
    );
  };

  const selectRecipeHandler = (selectedId: string) => {
    setSelected(selectedId);
    setRoute('CookPage');
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
          onAdvance={pageRoutingHandler}
        />
      )}
      {route === 'ListPage' && (
        <ListPage
          selectedList={acceptedList}
          onRemove={removeRecipeHandler}
          onSelect={selectRecipeHandler}
          onAdvance={pageRoutingHandler}
        />
      )}
      {route === 'RefinePage' && (
        <RefinePage
          recipesList={acceptedList}
          onRemove={removeRecipeHandler}
          onSelect={selectRecipeHandler}
        />
      )}
      {route === 'CookPage' && <CookPage selectedId={selected} />}
    </>
  );
}
