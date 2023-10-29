import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserService } from "./user.service";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public nameToken: string = 'probox_token';
    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(
        protected http: HttpClient,
        private readonly router: Router,
    ) { }

    public getNameToken(): string {
        return this.nameToken;
    }

    public setAccesToken(token: string): void {
        localStorage.setItem(this.nameToken, token);
    }

    public checkLogin(): boolean {
        return localStorage.getItem(this.nameToken) && localStorage.getItem(this.nameToken) !== 'undefined' ? true : false;
    }


    // Login
    public login(email: string, password: string): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: {
                // email: `${email}`,
                // password: `${password}`,
            }
        };
        return this.http.post<any>(`${this.url}/auth/login`,
            {
                email: `${email}`,
                password: `${password}`
            },
            options)
            .pipe(
                tap(({ data: { access_token } }) => {
                    this.setAccesToken(access_token);
                }),
                catchError(this.erroHandler)
            );
    }

    // Logout
    public logout(): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: {}
        };
        return this.http.get<any>(`${this.url}/auth/logout`, options).pipe(
            tap(res => {
                // this.user = undefined;
                // this.updatedUserBehavior(undefined);
                this.logoutForce();
            })
        );
    }

    public logoutForce() {
        localStorage.removeItem(this.nameToken);
        this.router.navigate(['/']);
    }

    erroHandler(error: HttpErrorResponse) {
        return throwError(() => error);
    }
}
