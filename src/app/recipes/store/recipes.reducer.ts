import { Recipe } from "../recipe.model";
import {
  RecipeActions,
  SET_RECIPES,
  ADD_RECIPE,
  UPDATE_RECIPES,
  DELETE_RECIPES,
} from "./recipes.actions";

export interface State {
  recipes: Recipe[];
}

const initialStage: State = {
  recipes: [],
};

export function recipeReducer(state, action: RecipeActions) {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case UPDATE_RECIPES:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case DELETE_RECIPES:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index != action.payload;
        }),
      };
  }
}
