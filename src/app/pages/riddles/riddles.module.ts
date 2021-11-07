import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DawnComponent} from "./sofia/dawn.component";
import {Route, RouterModule} from "@angular/router";
import {UnlockModule} from "../../core/components/unlock/unlock.module";

const routes: Route[] = [
    {path: "lscheqbu", component: DawnComponent}
];

@NgModule({
    declarations: [
        DawnComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UnlockModule
    ]
})
export class RiddlesModule {
}
