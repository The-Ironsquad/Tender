class Recipe {
  id: string;
  title: string;
  imgSrc: string;
  ingredients: Record<string, string>;
  directions: string[];

  constructor(
    id: string,
    title: string,
    imgSrc: string,
    ingredients: Record<string, string>,
    directions: string[]
  ) {
    this.id = id;
    this.title = title;
    this.imgSrc = imgSrc;
    this.ingredients = ingredients;
    this.directions = directions;
  }
}

export default Recipe;
