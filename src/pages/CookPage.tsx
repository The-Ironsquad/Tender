import { FC, useState, useEffect } from 'react';

import Recipe from '../models/recipe';

import styles from './CookPage.module.css';
import fetchRecipeById from '../utils/fetchRecipebyId';

type PropsType = {
  selectedId: string;
  onAdvance: (page: string) => void;
};

const EMPTY_RECIPE = new Recipe('', '', '', {}, ['']);

const CookPage: FC<PropsType> = ({ selectedId, onAdvance }) => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);

  useEffect(() => {
    if (selectedId) fetchRecipeById(setRecipe, selectedId);
  }, [selectedId]);

  if (recipe.id === '') {
    return (
      <div className={styles['cook-page']}>
        <h1>Time to Cook</h1>
        <div className={styles.empty}>
          <h3>No Recipes Selected!</h3>
          <button onClick={() => onAdvance('SelectPage')}>
            Go to selection!
          </button>
          <button onClick={() => onAdvance('ListPage')}>
            Go to your List!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cook-page']}>
      <h1>Time to Cook</h1>
      <img src={recipe.imgSrc} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <ul className={styles.ingredients}>
        <h3>Ingredients</h3>
        {Object.keys(recipe.ingredients).map((key) => (
          <li key={key}>
            <span>{recipe.ingredients[key]}</span>
            <span>{key}</span>
          </li>
        ))}
      </ul>
      <ul className={styles.instructions}>
        <h3>Cooking Instructions</h3>
        {recipe.directions.map((step, idx) => (
          <p key={idx}>{step}</p>
        ))}
      </ul>
    </div>
  );
};

export default CookPage;
