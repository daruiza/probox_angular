import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IUser } from "src/app/models/IUser";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public nameToken: string = 'probox_token';
    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    public user: IUser | undefined = undefined;

    constructor(
        protected http: HttpClient,
        private readonly router: Router
        // private readonly messagesAlertService: ModalAlertService,
        // private readonly userService: UserService,
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
                tap(auth => {
                    this.setAccesToken(auth.access_token);
                }),
                catchError(this.erroHandler)
            );
    }

    public logoutForce() {
        localStorage.removeItem(this.nameToken);
        this.user = undefined;
        this.router.navigate(['/']);
      }

    erroHandler(error: HttpErrorResponse) {
        console.log('error', error);
        return throwError(() => error);
    }
}
