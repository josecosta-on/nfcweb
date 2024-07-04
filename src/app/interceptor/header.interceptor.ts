import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers;
    
        headers = headers.set('ngrok-skip-browser-warning','any-value');
        headers = headers.set('Access-Control-Allow-Origin',"*")
    
    const modifiedReq = request.clone({headers});
    return next.handle(modifiedReq);
  }
}
