import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';
import { listActions } from '../store';

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

const SelectPage = () => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);
  const [showRecipe, setShowRecipe] = useState(false);
  const [swipeRight, setSwipeRight] = useState(true);

  const dispatch = useAppDispatch();
  const rejectedList = useAppSelector((state) => state.rejectedList);
  const categories = useAppSelector((state) => state.selectedCategories);

  useEffect(() => {
    fetchRandomRecipe(setRecipe, rejectedList, categories);
    setShowRecipe(true);
  }, [rejectedList, categories]);

  const acceptHandler = () => {
    setSwipeRight(true);
    dispatch(listActions.accept([recipe.id, recipe.title]));
    setTimeout(() => {
      setShowRecipe(false);
      fetchRandomRecipe(setRecipe, rejectedList, categories);
      setTimeout(() => {
        setShowRecipe(true);
      }, 250);
    }, 100);
  };

  const rejectHandler = () => {
    setSwipeRight(false);
    dispatch(listActions.reject(recipe.id));
    setTimeout(() => {
      setShowRecipe(false);
      fetchRandomRecipe(setRecipe, rejectedList, categories);
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
        <Link to="/list">See Your Selection</Link>
      </button>
    </div>
  );
};

export default SelectPage;
