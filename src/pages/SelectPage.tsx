import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/typedReduxHooks';
import { listActions } from '../store';

import fetchByCategory from '../utils/fetchByCategory';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './SelectPage.module.css';

const SelectPage = () => {
  const [recipesAvailable, setRecipesAvailable] = useState<
    Record<string, string>[]
  >([]);
  const [recipe, setRecipe] = useState<Record<string, string>>({});
  const [showRecipe, setShowRecipe] = useState(false);
  const [swipeRight, setSwipeRight] = useState(true);

  const dispatch = useAppDispatch();
  const rejectedList = useAppSelector((state) => state.rejectedList);
  const acceptedList = useAppSelector((state) => state.acceptedList);
  const categories = useAppSelector((state) => state.selectedCategories);

  useEffect(() => {
    if (categories.length === 0) return;
    fetchByCategory(setRecipesAvailable, categories);
  }, [categories]);

  useEffect(() => {
    setTimeout(() => {
      const avoidList = rejectedList.concat(
        acceptedList.map((recipe) => recipe[0])
      );
      setRecipesAvailable((recipes) =>
        recipes.filter(
          (currentRecipe) => !avoidList.includes(currentRecipe.idMeal)
        )
      );
    }, 400);
  }, [acceptedList, rejectedList]);

  useEffect(() => {
    if (recipesAvailable.length === 0) return;

    const randomRecipe =
      recipesAvailable[Math.floor(Math.random() * recipesAvailable.length)];

    setTimeout(() => {
      setRecipe(randomRecipe);
    }, 50);
    setShowRecipe(true);
  }, [recipesAvailable]);

  const swapRecipes = () => {
    setTimeout(() => {
      setShowRecipe(false);
      setTimeout(() => {
        setShowRecipe(true);
      }, 350);
    }, 50);
  };

  const acceptHandler = () => {
    setSwipeRight(true);
    dispatch(listActions.accept([recipe.idMeal, recipe.strMeal]));
    swapRecipes();
  };

  const rejectHandler = () => {
    setSwipeRight(false);
    dispatch(listActions.reject(recipe.idMeal));
    swapRecipes();
  };

  if (categories.length === 0 || recipesAvailable.length === 0) {
    return (
      <div className={styles['select-page']}>
        <h1>Select</h1>
        <div className={styles['no-categories']}>
          {categories.length === 0 ? (
            <>
              <h3>No categories have been selected</h3>
              <button>
                <Link to="/">Select some Categories</Link>
              </button>
            </>
          ) : (
            <>
              <h3>No recipes available for your categories selection.</h3>
              <button>
                <Link to="/">Select more Categories</Link>
              </button>
              <button>
                <Link to="/list">Go to selected recipes</Link>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles['select-page']}>
      <h1>Select</h1>
      <div className={styles['img-container']}>
        <AnimatePresence>
          {showRecipe && (
            <motion.img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              initial={{ x: swipeRight ? -500 : 500 }}
              animate={{ x: 0 }}
              exit={{ x: swipeRight ? 500 : -500 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
      <h3>{recipe.strMeal}</h3>
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
