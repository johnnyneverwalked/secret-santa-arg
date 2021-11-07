import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as parallax from 'simple-parallax-js';
import {ConfigService} from "../../core/services/http/config.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('bg', {static: true}) bgImage: ElementRef;

    constructor(
        public config: ConfigService
    ) {
    }

    ngOnInit(): void {
        new parallax.default(this.bgImage.nativeElement, {scale: 1.5, delay: 0.4});
    }

}
