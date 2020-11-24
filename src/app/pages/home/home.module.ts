import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {Route, RouterModule} from "@angular/router";
import {DividerSkewModule} from "../../core/components/divider-skew/divider-skew.module";


const routes: Route[] = [
    {
        component: HomeComponent,
        path: ""
    }
];

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DividerSkewModule
    ]
})
export class HomeModule {
}
