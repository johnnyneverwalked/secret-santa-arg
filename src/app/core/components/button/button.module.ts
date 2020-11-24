import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [ButtonComponent],
    exports: [ButtonComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ButtonModule {
}

