import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { NavController } from '@ionic/angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService, private navCtrl: NavController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('access_token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401: // Unauthorized
            return this.handle401Error(req, next);
          case 403: // Forbidden
            return this.handle403Error();
          case 406: // Not Acceptable
            return this.handle406Error();
          default:
            return throwError(error);
        }
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.refreshToken().pipe(
      switchMap((res: any) => {
        if (res && res.access_token) {
          this.userService.updateToken(res.access_token);
          const newToken = localStorage.getItem('access_token');
          const request = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });
          return next.handle(request);
        } else {
          return this.handle403Error(); 
        }
      }),
      catchError((err) => {
        return this.handle403Error(); 
      })
    );
  }


  private handle403Error(): Observable<any> {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.navCtrl.navigateRoot('/login');
    });
    return EMPTY;
  }

  private handle406Error(): Observable<any> {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      this.navCtrl.navigateRoot('/login');
    });
    return EMPTY;
  }
}

