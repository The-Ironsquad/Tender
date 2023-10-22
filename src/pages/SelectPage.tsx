import { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import styles from './SelectPage.module.css';
import Recipe from '../models/recipe';

const EMPTY_RECIPE = new Recipe('', '', {}, [''], 0, 0, 0);

const SelectPage = () => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);

  useEffect(() => {
    const fetchRecipe = async () => {
      const { data } = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/random.php'
      );
      const [meal] = data.meals;
      const ingredients = Object.keys(meal)
        .filter((key) => key.match('strIngredient*') && meal[key] !== '')
        .map((key) => meal[key]);

      const measurments = Object.keys(meal)
        .filter((key) => key.match('strMeasure*') && meal[key] !== '')
        .map((key) => meal[key]);

      const ingredientsObj: Record<string, string> = {};
      ingredients.forEach((ingredient, idx) => {
        ingredientsObj[ingredient] = measurments[idx];
      });

      const directions =
        typeof meal?.strInstructions === 'string'
          ? meal.strInstructions.split('\r\n')
          : [];

      const recipe = new Recipe(
        meal.strMeal,
        meal.strMealThumb,
        ingredientsObj,
        directions,
        2,
        30,
        10
      );
      setRecipe(recipe);
    };
    fetchRecipe();
  }, []);

  return (
    <div className={styles['select-page']}>
      <h1>Select</h1>
      <img src={recipe.imgSrc} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className={styles.action}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="3x"
          style={{ color: 'red' }}
        />
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="3x"
          style={{ color: 'green' }}
        />
      </div>
    </div>
  );
};

export default SelectPage;
