import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SofiaComponent} from "./sofia/sofia.component";
import {Route, RouterModule} from "@angular/router";
import {UnlockModule} from "../../core/components/unlock/unlock.module";

const routes: Route[] = [
    {path: "lscheqbu", component: SofiaComponent}
];

@NgModule({
    declarations: [
        SofiaComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UnlockModule
    ]
})
export class RiddlesModule {
}
