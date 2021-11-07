import {Injectable, OnDestroy} from "@angular/core";
import {ScrollToService, ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: "root",
})

export class MessageService {

    private _baseRoute: string = `${environment.api}messages`;

    constructor(
        private _http: HttpClient
    ) {
    }

    public sendMessage(email: string, name?: string, message?: string): Observable<any> {
        return this._http.post(this._baseRoute, {email, name, message})
            .pipe(map(res => res));
    }

}
