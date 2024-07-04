import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private router: Router, private userService: UserService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						if (event.body.status === 'UNAUTHORIZED') {
							// this.router.navigate(['tabs/account']);
							this.userService.remove();
						}
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
					}
				}
			)
		);
	}
}
