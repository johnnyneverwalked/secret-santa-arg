import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation/navigation.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit {


    constructor(
        public navService: NavigationService,
    ) { }

    ngOnInit(): void {
    }
}
