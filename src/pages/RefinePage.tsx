import { FC, useEffect, useState } from 'react';

import styles from './RefinePage.module.css';
import Recipe from '../models/recipe';
import fetchRecipeById from '../utils/fetchRecipebyId';

type PropsType = {
  recipesList: string[][];
  onRemove: (removeId: string) => void;
  onSelect: (selectedId: string) => void;
};

const EMPTY_RECIPE = new Recipe('', '', '', {}, ['']);

const RefinePage: FC<PropsType> = ({ recipesList, onRemove, onSelect }) => {
  const [recipeA, setRecipeA] = useState<Recipe>(EMPTY_RECIPE);
  const [recipeB, setRecipeB] = useState<Recipe>(EMPTY_RECIPE);

  useEffect(() => {
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

  return (
    <div className={styles['refine-page']}>
      <h1>Death Match</h1>
      <div className={styles['recipe-card']}>
        <img src={recipeA.imgSrc} alt={recipeA.title} />
        <h3>{recipeA.title}</h3>
      </div>
      <h2>Vs</h2>
      <div className={styles['recipe-card']}>
        <img src={recipeB.imgSrc} alt={recipeB.title} />
        <h3>{recipeB.title}</h3>
      </div>
    </div>
  );
};

export default RefinePage;
