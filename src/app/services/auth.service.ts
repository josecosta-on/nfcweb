import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { getAuth, signInWithPopup, signInWithCredential, signOut, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private controller = 'auth/';

	constructor(private api: ApiService) {
		this.initFirebase();
	}

	initFirebase() {
		environment.firebase && initializeApp(environment.firebase);
	}

	find(data: any) {
		return this.api.post(this.controller + 'find', data);
	}

	checkCode(data: any) {
		return this.api.post(this.controller + 'check-code', data);
	}

	can(data: any) {
		return this.api.post(this.controller + 'can', data);
	}


	login(data: any) {
		return this.api.post(this.controller + 'login', data);
	}

	loginFirebase(data: any) {
		return this.api.post(this.controller + 'login-firebase', data);
	}

	register(data: any) {
		return this.api.post(this.controller + 'register', data);
	}

	set_password(data: any) {
		return this.api.post(this.controller + 'set-password', data);
	}

	recover(data: any) {
		return this.api.post(this.controller + 'reset-password', data);
	}

	setAuth(auth: string) {
		this.api.setAuth(auth);
	}

	async logoutFirebase() {
		const auth = getAuth();
		signOut(auth)
			.then((data) => {
				// Sign-out successful.
			})
			.catch((error) => {
				console.log(error);
				// An error happened.
			});
	}

	async google(): Promise<any> {
		const auth = getAuth();
		let response = await this.firebase(auth, new GoogleAuthProvider(), GoogleAuthProvider);
		return response;
	}

	async facebook(): Promise<any> {
		const auth = getAuth();
		let response = this.firebase(auth, new FacebookAuthProvider(), FacebookAuthProvider);
		return response;
	}

	async firebase(auth, provider, providerCredential) {
		return new Promise((resolve, reject) => {
			signInWithPopup(auth, provider)
				.then(async (result) => {
					// The signed-in user info.
					const user = result.user;

					// This gives you a Facebook Access Token. You can use it to access the Facebook API.
					const credential = providerCredential.credentialFromResult(result);
					const accessToken = credential.accessToken;

					resolve(result);
				})
				.catch(async (error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					console.log(errorMessage);
					// The email of the user's account used.
					const email = error.email;
					// The AuthCredential type that was used.
					const credential = providerCredential.credentialFromError(error);

					const user = error.user;

					reject(errorMessage);
				});
		});
	}

	validate(data: any) {
		return this.api.post(this.controller + 'validate', {
			phone_code: data.phone_code ? Number(data.phone_code) : null,
			phone: data.phone ? Number(data.phone) : null,
			email: data.email ? data.email : null
		});
	}
}
