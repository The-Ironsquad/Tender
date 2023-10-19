class Recipe {
  title: string;
  ingredients: {
    [key: string]: string;
  };
  directions: string[];
  servings: number;
  preparationTime: number;
  cookingTime: number;

  constructor(
    title: string,
    ingredients: Record<string, string>,
    directions: string[],
    servings: number,
    preparationTime: number,
    cookingTime: number
  ) {
    this.title = title;
    this.ingredients = ingredients;
    this.directions = directions;
    this.servings = servings;
    this.preparationTime = preparationTime;
    this.cookingTime = cookingTime;
  }
}

export default Recipe;
