import {Component} from '@angular/core';
import {ConfigService} from "./core/services/http/config.service";
import {NavigationService} from "./core/services/navigation/navigation.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'arg-site';

    constructor(
        private configService: ConfigService,
        public navService: NavigationService
    ) {
        configService.config()
            .subscribe(res => {
                if (res.success) {
                    this.configService.config$.next(res.data);
                }
            });
    }
}
