import axios from 'axios';

type CategoriyInput = {
  name: string;
  checked: boolean;
};

const fetchCategories = async (
  setCategories: (categories: CategoriyInput[]) => void
) => {
  try {
    const { data } = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
    const { categories } = data;
    setCategories(
      categories.map((category: Record<string, string>) => ({
        name: category.strCategory,
        checked: false,
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export default fetchCategories;
