import { Injectable } from "@angular/core";
import { Subject } from 'rxjs-compat';
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{
    subscription = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.subscription.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.subscription.next(this.ingredients.slice());
    }
}