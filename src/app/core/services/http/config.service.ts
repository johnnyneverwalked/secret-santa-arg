import {Injectable, OnDestroy} from "@angular/core";
import {ScrollToService, ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: "root",
})

export class ConfigService {

    private _baseRoute: string = `${environment.api}config`;

    public config$ = new BehaviorSubject<any>(null);

    constructor(
        private _http: HttpClient
    ) {
    }

    public config(): Observable<any> {
        return this._http.get(this._baseRoute)
            .pipe(map(res => res));
    }

}
