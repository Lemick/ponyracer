import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  private token: string;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor token=', this.token);
    if (this.token && this.token.length > 0) {
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`
          }
        })
      );
    }
    return next.handle(req);
  }

  setJwtToken(token: string) {
    this.token = token;
  }

  removeJwtToken() {
    this.token = null;
  }
}
