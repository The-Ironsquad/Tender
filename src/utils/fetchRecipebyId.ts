import axios from 'axios';
import Recipe from '../models/recipe';

const fetchRecipeById = async (
  recipeSave: (recipe: Recipe) => void,
  id: string
) => {
  const { data } = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
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

  const directions = meal.strInstructions.split('\r\n');

  const recipe = new Recipe(
    meal.idMeal,
    meal.strMeal,
    meal.strMealThumb,
    ingredientsObj,
    directions
  );
  recipeSave(recipe);
};

export default fetchRecipeById;
