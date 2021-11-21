import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation/navigation.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})

export class NavBarComponent implements OnInit {


    constructor(
        public navService: NavigationService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    iconClick(evt: MouseEvent) {
        if (evt.shiftKey && (evt.ctrlKey || evt.metaKey)) {
            this.router.navigate(['/mIsHBoav']);
        }
    }
}
