import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from './auth.service';
import { AppService } from '../app.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    public url = `${environment.baseAPI}`;
    public httpHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    public user: IUser | undefined = undefined;
    public observableUser!: Observable<IUser | undefined>;
    public behaviorUser = new Subject<IUser | undefined>();

    constructor(
        protected http: HttpClient,
        private readonly authService: AuthService,
        private readonly appService: AppService
    ) {
        this.observableUser = this.behaviorUser.asObservable();
    }

    updatedUserBehavior(user: IUser | undefined) {
        this.user = user;
        this.behaviorUser.next(user);
    }

    public getUser(): Observable<any> {
        if (!this.user && this.authService.checkLogin()) {
            const options = {
                headers: this.httpHeaders,
                params: {}
            };
            return this.http.get<any>(`${this.url}/auth/user`, options)
                .pipe(map(resuser => {
                    this.user = resuser.data.user;
                    this.updatedUserBehavior(resuser.data.user);
                    this.appService.setTheme(this.user?.theme ?? 'blue-grey-theme');
                    return resuser.data.user;
                }));
        }
        return of(this.user);
    }

    public updateUser(body: any): Observable<any> {
        const options = {
            headers: this.httpHeaders,
            params: {}
        };
        return this.http.put<any>(`${this.url}/user/update`, body, options)
            .pipe(map(resuser => {
                this.user = resuser.data.user;
                this.updatedUserBehavior(resuser.data.user);
                this.appService.setTheme(this.user?.theme ?? 'blue-grey-theme');
                return { ...resuser.data.user, message: resuser.message };
            }));
    }



}
