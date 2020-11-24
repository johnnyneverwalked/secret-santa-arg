import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactComponent} from './contact.component';
import {Route, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "../../core/components/button/button.module";

 const routes: Route[] = [
     {
         path: "",
         component: ContactComponent
     }
 ];

@NgModule({
    declarations: [ContactComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ButtonModule
    ]
})
export class ContactModule {
}
