import { FETCH_RECIPES, SetRecipes } from './recipes.actions';
import { ofType } from '@ngrx/effects';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    constructor(private actions$: Actions, private http: HttpClient){}

    @Effect()
    fetchRecipes = this.actions$.pipe(ofType(FETCH_RECIPES), 
    switchMap(() => {
        return this.http
        .get<Recipe[]>(
          'https://ng-recipe-book-b96a6-default-rtdb.firebaseio.com/recipes.json',
        )
    }), 
    map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
          return new SetRecipes(recipes);
      })
    );
}