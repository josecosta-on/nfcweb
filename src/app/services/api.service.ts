import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	public auth_key: string|undefined ;
	
	constructor(
		private http: HttpClient,
		private tokens: TokenService
	) {

	}

	setAuth(auth: string|undefined) {
		this.auth_key = auth;
	}

	get(url: string, data?: any , token = "city") {
		const t = this.tokens.token[token]
		let headers = t.headers({auth_key:this.auth_key})

		let params = new HttpParams();

		if (data) {
			for (let p in data) {
				if (data[p]) {
					params = params.set(p, data[p]);
				}
			}
		}

		return this.http.get(t.url + url, { headers, params });
	}

	post(url: string, data: any, token = "city") {
		const t = this.tokens.token[token]
		let headers = t.headers({auth_key:this.auth_key})
		return this.http.post(t.url + url, data, { headers});
	}

}
