import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Recipe from '../models/recipe';
import fetchRandomRecipe from '../utils/fetchRandomRecipe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './SelectPage.module.css';

const EMPTY_RECIPE = new Recipe('', '', '', {}, ['']);

type PropsType = {
  rejectedList: string[];
  onAccept: (id: string, title: string) => void;
  onReject: (id: string) => void;
};

const SelectPage: FC<PropsType> = ({ onAccept, onReject, rejectedList }) => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);
  const [showRecipe, setShowRecipe] = useState(false);
  const [swipeRight, setSwipeRight] = useState(true);

  useEffect(() => {
    fetchRandomRecipe(setRecipe, rejectedList);
    setShowRecipe(true);
  }, [rejectedList]);

  const acceptHandler = () => {
    setSwipeRight(true);
    onAccept(recipe.id, recipe.title);
    setTimeout(() => {
      setShowRecipe(false);
      fetchRandomRecipe(setRecipe, rejectedList);
      setTimeout(() => {
        setShowRecipe(true);
      }, 250);
    }, 100);
  };

  const rejectHandler = () => {
    setSwipeRight(false);
    onReject(recipe.id);
    setTimeout(() => {
      setShowRecipe(false);
      fetchRandomRecipe(setRecipe, rejectedList);
      setTimeout(() => {
        setShowRecipe(true);
      }, 250);
    }, 100);
  };

  return (
    <div className={styles['select-page']}>
      <h1>Select</h1>
      <div className={styles['img-container']}>
        <AnimatePresence>
          {showRecipe && (
            <motion.img
              src={recipe.imgSrc}
              alt={recipe.title}
              initial={{ x: swipeRight ? -500 : 500 }}
              animate={{ x: 0 }}
              exit={{ x: swipeRight ? 500 : -500 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
      <h3>{recipe.title}</h3>
      <div className={styles.action}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="4x"
          style={{ color: 'red' }}
          onClick={rejectHandler}
        />
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="4x"
          style={{ color: 'green' }}
          onClick={acceptHandler}
        />
      </div>
      <button>
        <Link to="/select">See Your Selection</Link>
      </button>
    </div>
  );
};

export default SelectPage;
