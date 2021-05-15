import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [AuthComponent], 
    imports: [
        FormsModule, 
        CommonModule, 
        SharedModule
    ]
})
export class AuthModule {}