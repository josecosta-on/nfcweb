import { Injectable, Injector, Type } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { isSupported } from 'firebase/messaging';
import { ServiceLocator } from '@app/app.module';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root'
})
export class MessageService {
	protected afMessaging: AngularFireMessaging;

	private messages$: BehaviorSubject<any>;
	private controller: string = 'message/';



	constructor(private api: ApiService) {
		const injector: Injector = ServiceLocator.injector;

		this.messages$ = new BehaviorSubject(null);
		if(environment.firebase){
			this.afMessaging = injector.get<AngularFireMessaging>(AngularFireMessaging as Type<AngularFireMessaging>);

		}

	}

	all(page: any) {
		return this.api.get(this.controller + 'all', { page });
	}

	latest() {
		return this.api.get(this.controller + 'latest');
	}

	one(id: string) {
		return this.api.get(this.controller + 'one', { id });
	}

	open(id: string) {
		return this.api.get(this.controller + 'open', { id });
	}

	count() {
		return this.api.get(this.controller + 'count');
	}

	delete(id: string) {
		return this.api.post(this.controller + 'delete', { id });
	}

	requestPermission() {
		return new Promise<any>((resolve, reject) => {
			isSupported().then((data: any) => {
				if (data) {
					this.afMessaging.requestToken.subscribe(
						(token) => {
							resolve(token);
						},
						(error) => {
							reject(error);
						}
					);
				} else {
					return reject('unsupported');
				}
			});
		});
	}

	listen() {
		return new Promise<any>((resolve, reject) => {
			this.afMessaging.messages.subscribe(
				(message) => {
					this.messages$.next(message);
					resolve(message);
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	listenMessages() {
		isSupported().then((data: any) => {
			if (!data) {
				var maxTime = 60;
				var time = 0;
				var messageID = null;
				var func = () => {
					time++;
					this.latest().subscribe((data: any) => {
						if (!messageID || data.data.id === messageID) {
							messageID = data.data.id;
						} else {
							this.messages$.next({ data: data.data });
							clearInterval(interval);
						}
					});
					if (time > maxTime) {
						clearInterval(interval);
					}
				};
				var interval = setInterval(func, 5000);
			}
		});
	}

	get() {
		return this.messages$;
	}
}
