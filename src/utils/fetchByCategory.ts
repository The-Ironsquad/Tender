import axios from 'axios';

const fetchByCategory = async (
  recipesSave: (mealsAvailable: Record<string, string>[]) => void,
  categories: string[]
) => {
  try {
    const meals: Record<string, string>[] = [];

    for (const category of categories) {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      meals.push(...data.meals);
    }

    recipesSave(meals);
  } catch (error) {
    console.log(error);
  }
};

export default fetchByCategory;
