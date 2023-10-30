import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class GeneralListService {

    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(protected http: HttpClient) { }

    public getListByName(name: string): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: { name }
        };
        return this.http.get<any>(`${this.url}/generallist/showbyname`, options).pipe(
            map(response => response?.data?.generallist.map((el:any)=>({
                id: el.id,
                name: el.value
            })) ?? [])
        );

    }
}