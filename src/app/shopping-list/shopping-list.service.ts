import { Injectable } from "@angular/core";
import { Subject } from 'rxjs-compat';
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService{


    subscription = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
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

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index:number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.subscription.next(this.ingredients.slice());
    }  
    
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.subscription.next(this.ingredients.slice());
    }
}