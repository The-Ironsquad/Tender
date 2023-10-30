import axios from 'axios';
import Recipe from '../models/recipe';

const fetchRandomRecipe = async (
  recipeSave: (recipe: Recipe) => void,
  avoidList: string[]
) => {
  try {
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
      directions
    );
    recipeSave(recipe);
  } catch (error) {
    console.log(error);
  }
};

export default fetchRandomRecipe;
