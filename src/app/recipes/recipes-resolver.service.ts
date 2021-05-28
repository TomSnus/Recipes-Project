import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import *  as fromApp from './../store/app.reducer'
import { Store } from '@ngrx/store';
import { FetchRecipes, SET_RECIPES } from './store/recipes.actions';
import { ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private recipesService: RecipeService, 
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new FetchRecipes());
    return this.actions$.pipe(ofType(SET_RECIPES), take(1));
  }
}
