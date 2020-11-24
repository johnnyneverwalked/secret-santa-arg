import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as parallax from 'simple-parallax-js';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('bg', {static: true}) bgImage: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
        new parallax.default(this.bgImage.nativeElement, {scale: 1.5, delay: 0.4});
    }

}
