import axios from 'axios';

const fetchCategories = async (
  setCategories: (categories: string[]) => void
) => {
  try {
    const { data } = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
    const { categories } = data;
    setCategories(
      categories.map((category: Record<string, string>) => category.strCategory)
    );
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategories;
