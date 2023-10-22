import { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

import styles from './SelectPage.module.css';
import Recipe from '../models/recipe';

const EMPTY_RECIPE = new Recipe('', '', '', {}, [''], 0, 0, 0);

const fetchRecipe = async (
  recipeSave: (recipe: Recipe) => void,
  avoidList: string[]
) => {
  let meal: Record<string, string>;
  do {
    const { data } = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    );
    [meal] = data.meals;
  } while (avoidList.includes(meal.idMeal));

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

  const directions = meal.strInstructions.split('\r\n');

  const recipe = new Recipe(
    meal.idMeal,
    meal.strMeal,
    meal.strMealThumb,
    ingredientsObj,
    directions,
    2,
    30,
    10
  );
  recipeSave(recipe);
};

const SelectPage = () => {
  const [recipe, setRecipe] = useState<Recipe>(EMPTY_RECIPE);
  const [acceptedList, setAcceptedList] = useState<string[]>([]);
  const [rejectedList, setRejectedList] = useState<string[]>([]);

  useEffect(() => {
    fetchRecipe(setRecipe, rejectedList);
  }, [rejectedList]);

  const acceptRecipeHandler = () => {
    setAcceptedList((previousState) => [...previousState, recipe.id]);
    fetchRecipe(setRecipe, rejectedList);
  };

  const rejectRecipeHandler = () => {
    setRejectedList((previousState) => [...previousState, recipe.id]);
    setRejectedList((previousState) => {
      fetchRecipe(setRecipe, previousState);
      return previousState;
    });
  };

  console.log(acceptedList, rejectedList);

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
          onClick={rejectRecipeHandler}
        />
        <FontAwesomeIcon
          icon={faCircleCheck}
          size="3x"
          style={{ color: 'green' }}
          onClick={acceptRecipeHandler}
        />
      </div>
    </div>
  );
};

export default SelectPage;
