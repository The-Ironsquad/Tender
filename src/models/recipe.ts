class Recipe {
  id: string;
  title: string;
  imgSrc: string;
  ingredients: Record<string, string>;
  directions: string[];
  servings: number;
  preparationTime: number;
  cookingTime: number;
  totalTime: number;

  constructor(
    id: string,
    title: string,
    imgSrc: string,
    ingredients: Record<string, string>,
    directions: string[],
    servings: number,
    preparationTime: number,
    cookingTime: number
  ) {
    this.id = id;
    this.title = title;
    this.imgSrc = imgSrc;
    this.ingredients = ingredients;
    this.directions = directions;
    this.servings = servings;
    this.preparationTime = preparationTime;
    this.cookingTime = cookingTime;
    this.totalTime = preparationTime + cookingTime;
  }
}

export default Recipe;
