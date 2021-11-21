import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoSanitizePipe} from "./nosanitizerpipe";



@NgModule({
  declarations: [NoSanitizePipe],
  exports: [NoSanitizePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
