import {Injectable, OnDestroy} from "@angular/core";
import {ScrollToService, ScrollToConfigOptions} from "@nicky-lenaers/ngx-scroll-to";
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: "root",
})

export class FileService {

    private _baseRoute: string = `${environment.api}files`;

    constructor(
        private _http: HttpClient
    ) {
    }

    public getFolder(folder: string): Observable<any> {
        return this._http.get(`${this._baseRoute}/folder/${folder}`)
            .pipe(map(res => res));
    }

    public getFile(file: string, folder: string): Observable<any> {
        return this._http.get(`${this._baseRoute}/folder/${folder}/file/${file}`)
            .pipe(map(res => res));
    }

}
