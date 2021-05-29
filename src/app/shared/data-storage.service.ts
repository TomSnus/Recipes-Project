import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Store } from '@ngrx/store';
import *  as fromApp from './../store/app.reducer'
import { SetRecipes } from '../recipes/store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-b96a6-default-rtdb.firebaseio.com/recipes.json',
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.store.dispatch(new SetRecipes(recipes));
        })
      );
  }
}
