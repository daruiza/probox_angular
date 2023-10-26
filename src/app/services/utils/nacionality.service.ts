import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class NacionalityService {

    public url = `https://api.manatal.com/open/v3/nationalities/`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        protected http: HttpClient,
    ) {
    }

    public getNationalities(): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: {}
        };
        return this.http.get<any>(`${this.url}`, options).pipe(
            map((nationalities) => {
                return nationalities.map((ationality: any) => ({ name: ationality?.common_name ?? '' }))
            }),
            // tap((nationalites) => { name: nationality?.common_name })
        );

    }
}