import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        //'X-Content-Type-Options': 'nosniff',
    });

    constructor(
        protected http: HttpClient,
    ) { }

    public showbyid(id: number): Observable<any> {
        const options = {
            // No tama los headers correctamente
            // headers: this.httpHeaders,
            params: {
                noShowTogleLoadingSubject: true
            }
        };
        return this.http.get<any>(`${this.url}/project/showbyid/${id}`, options).pipe(
            map((res: any) => (res?.data?.project ?? {}))
        );
    }

    public update(id: number, formData: any): Observable<any> {
        const options = {
            // No tama los headers correctamente
            // headers: this.httpHeaders,
            params: {}
        };
        return this.http.put<any>(`${this.url}/project/update/${id}`, formData, options);
    }
}