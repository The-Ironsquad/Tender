import { FC, useEffect, useState } from 'react';

import styles from './RefinePage.module.css';
import Recipe from '../models/recipe';
import fetchRecipeById from '../utils/fetchRecipebyId';

type PropsType = {
  recipesList: string[][];
  onRemove: (removeId: string) => void;
  onSelect: (selectedId: string) => void;
  onAdvance: (page: string) => void;
};

const EMPTY_RECIPE = new Recipe('', '', '', {}, ['']);

const RefinePage: FC<PropsType> = ({ recipesList, onRemove, onSelect, onAdvance }) => {
  const [recipeA, setRecipeA] = useState<Recipe>(EMPTY_RECIPE);
  const [recipeB, setRecipeB] = useState<Recipe>(EMPTY_RECIPE);

  useEffect(() => {
    if (recipesList.length === 0) return;
    if (recipesList.length === 1) onSelect(recipesList[0][0]);
  }, [onSelect, recipesList]);

  useEffect(() => {
    if (recipesList.length < 2) return;
    let idxA: number;
    let idxB: number;
    if (recipeA.id === '' && recipeB.id === '') {
      idxA = Math.floor(Math.random() * recipesList.length);
      do {
        idxB = Math.floor(Math.random() * recipesList.length);
      } while (idxA === idxB);
      fetchRecipeById(setRecipeA, recipesList[idxA][0]);
      fetchRecipeById(setRecipeB, recipesList[idxB][0]);
    } else if (recipeB.id === '') {
      idxA = recipesList.findIndex((recipe) => recipe[0] === recipeA.id);
      do {
        idxB = Math.floor(Math.random() * recipesList.length);
      } while (idxA === idxB);
      fetchRecipeById(setRecipeB, recipesList[idxB][0]);
    } else if (recipeA.id === '') {
      idxB = recipesList.findIndex((recipe) => recipe[0] === recipeB.id);
      do {
        idxA = Math.floor(Math.random() * recipesList.length);
      } while (idxA === idxB);
      fetchRecipeById(setRecipeA, recipesList[idxA][0]);
    }
  }, [recipeA, recipeB, recipesList]);

  if (recipesList.length === 0) {
    return (
      <div className={styles['refine-page']}>
        <h1>Death Match</h1>
        <div className={styles.empty}>
          <h3>No Recipes Selected!</h3>
          <button onClick={() => onAdvance('SelectPage')}>
            Go to selection!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['refine-page']}>
      <h1>Death Match</h1>
      <div className={styles['recipe-card']}>
        <img
          src={recipeA.imgSrc}
          alt={recipeA.title}
          onClick={() => {
            onRemove(recipeB.id);
            setRecipeB(EMPTY_RECIPE);
          }}
        />
        <h3>{recipeA.title}</h3>
      </div>
      <h2>Vs</h2>
      <div className={styles['recipe-card']}>
        <img
          src={recipeB.imgSrc}
          alt={recipeB.title}
          onClick={() => {
            onRemove(recipeA.id);
            setRecipeA(EMPTY_RECIPE);
          }}
        />
        <h3>{recipeB.title}</h3>
      </div>
    </div>
  );
};

export default RefinePage;
