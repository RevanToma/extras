export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  mealType: string[];
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
}

export interface RecipeSearchResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export interface Favorite {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
}