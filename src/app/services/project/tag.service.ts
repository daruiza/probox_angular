import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TagService {

    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        protected http: HttpClient,
    ) { }

    public get(category: string | null = null, attrdefault: boolean | null = null): Observable<any> {
        const options = {
            // No tama los headers correctamente
            // headers: this.httpHeaders,
            params: {
                category: category ?? '',
                default: attrdefault ?? '',
                noShowTogleLoadingSubject: true
            }
        };
        return this.http.get<any>(`${this.url}/tag/index/`, options).pipe(
            map((res: any) => (res?.tags ?? {}))
        );
    }

}