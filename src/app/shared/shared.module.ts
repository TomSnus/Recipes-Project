import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropDownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        AlertComponent, 
        LoadingSpinnerComponent, 
        PlaceholderDirective, 
        DropDownDirective
    ], 
    imports: [CommonModule],
    exports: [
        AlertComponent, 
        LoadingSpinnerComponent, 
        PlaceholderDirective, 
        DropDownDirective
    ]
})
export class SharedModule {

}