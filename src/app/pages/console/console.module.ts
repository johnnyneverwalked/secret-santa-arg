import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import {Route, RouterModule} from "@angular/router";
import {PipesModule} from "../../core/pipes/pipes.module";

const routes: Route[] = [
    {path: "", component: ConsoleComponent}
];

@NgModule({
    declarations: [
        ConsoleComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PipesModule,
    ]
})
export class ConsoleModule { }
