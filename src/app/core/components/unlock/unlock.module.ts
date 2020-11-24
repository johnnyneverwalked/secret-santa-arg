import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnlockComponent } from './unlock.component';
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [UnlockComponent],
    exports: [
        UnlockComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class UnlockModule { }
