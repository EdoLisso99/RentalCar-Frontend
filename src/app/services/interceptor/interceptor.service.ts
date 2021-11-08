import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {LoginService} from "../login/login.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.loginService.getToken();
    if (token !== null){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + token)
      });
      return next.handle(authReq)
        .pipe(
          catchError((error) => {
            console.log('error ' + error.status + ' is intercept');
            console.error(error);
            alert("Errore! La richiesta effettuata è stata rifiutata dal backend!")
            return throwError(error.message);
          }));
    }
    else {
      return next.handle(req);
    }
  }
}
