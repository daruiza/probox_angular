import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { finalize, catchError } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    public readonly loadingService: LoadingService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showTogleLoadingSubject();
    let newHeaders = request.headers;
    if (this.authService.checkLogin()) {
      newHeaders = newHeaders.append(
        'Authorization', `Bearer  ${localStorage.getItem(this.authService.getNameToken())}`
      );
    }
    const authReq = request.clone({ headers: newHeaders });
    return next.handle(authReq).pipe(
      catchError(this.handleError<any>(`Operación Fallida [I]`)),
      finalize(() => { this.loadingService.hideTogleLoadingSubject(); })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Si el error es de autenticación
      if (error.status === 401 || error.status === 403) {
        // logout Manual
        this.authService.logoutForce();
      }
      const errorMessage = error?.error?.message ? error.error.message : error.message;
      const errorAction = error?.error?.action ? error.error.action : 'Error!';
      this.loadingService.updatedSnackBehavior({
        message: errorMessage,
        action: errorAction,
        onAction: () => {
          console.log(operation, error);
        }
      });
      return throwError(() => error);
    };

  }
}
