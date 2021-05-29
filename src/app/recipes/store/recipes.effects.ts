import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from "./recipes.actions";
import { ofType } from "@ngrx/effects";
import { Actions, Effect } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";
import { createEffect } from "@ngrx/effects";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as fromApp from "./../../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        "https://ng-recipe-book-b96a6-default-rtdb.firebaseio.com/recipes.json",
        recipesState.recipes
      );
    })
  );

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://ng-recipe-book-b96a6-default-rtdb.firebaseio.com/recipes.json"
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes) => {
      return new SetRecipes(recipes);
    })
  );
}
