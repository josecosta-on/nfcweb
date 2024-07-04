import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import CryptoJS from 'crypto-js';


interface TokenGenerator{
    url:string
    headers:(params:any)=>HttpHeaders;
    generate:(timestamp, randomString)=>string
}

@Injectable({
	providedIn: 'root'
})
export class TokenService {
    public token: { [key: string]: TokenGenerator} = {};

    constructor(){
        this.token["city"] = {
            url: '' ,
            headers: (params:any)=>{
                let authorization = this.token["city"].generate(new Date().getTime() / 1000, this.genRandomString(8))
                let headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'X-Requested-With': environment.identifier,
                    '360city-Authorization': `${authorization}`
                });
                if (params.auth_key) {
                    headers = headers.set('Authorization', params.auth_key);
                }
                return headers;
            },
            generate:(timestamp, randomString)=>{
                const INTEGRATOR_AUTH_CODE = "aDgtZFV2IQ=="
                let auth_data_raw = timestamp + randomString;
                let auth_key_raw = this.decrypt(INTEGRATOR_AUTH_CODE);
        
                let hash = CryptoJS.HmacSHA256(auth_data_raw, auth_key_raw);
                let hashString = CryptoJS.enc.Base64.stringify(hash);
                let key = this.encrypt([timestamp, randomString, hashString].join(';'));
        
                return `app:${key}`;
            }
        }
        this.token["wpay"] = {
            url: '',
            headers: (params:any)=>{
                let authorization = this.token["wpay"].generate(new Date().getTime() / 1000, this.genRandomString(8))
                let headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    '360city-Authorization': `${authorization}`
                });
                if (params.auth_key) {
                    headers = headers.set('Authorization', params.auth_key);
                }
                return headers;
            },
            generate:(timestamp, randomString)=>{
                const INTEGRATOR_AUTH_CODE = "aDgtZFV2IQ=="
                const INTEGRATOR_CODE = "wpay" 
                let auth_data_raw = timestamp + randomString;
                let auth_key_raw = this.decrypt(INTEGRATOR_AUTH_CODE);

                let hash = CryptoJS.HmacSHA256(auth_data_raw, auth_key_raw);
                let hashString = CryptoJS.enc.Base64.stringify(hash);
                let key = this.encrypt([timestamp, randomString, hashString].join(';'));

                return `${INTEGRATOR_CODE}:${key}`;
            }
        }
    }
    encrypt(myString) {
		const encodedWord = CryptoJS.enc.Utf8.parse(myString);
		const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
		return encoded;
	}

	decrypt(str) {
		// Going backwards: from bytestream, to percent-encoding, to original string.
		return decodeURIComponent(
			atob(str)
				.split('')
				.map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join('')
		);
	}

	genRandomString(length) {
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
		var charLength = chars.length;
		var result = '';
		for (var i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * charLength));
		}
		return result;
	}
}