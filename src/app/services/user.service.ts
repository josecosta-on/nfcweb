import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { environment } from '@env/environment';
import { EventsService } from './events.service';
import { ErrorService } from './error.service';
import { BehaviorSubject, filter, finalize, interval, take, takeUntil } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {
 
	private controller = 'user/';
	private _user: any;

	constructor(public errorService:ErrorService, public storageService: StorageService, private api: ApiService, private eventsService: EventsService) {}

	async init() {
		return await this.reload()
	}

	$closeState = new BehaviorSubject(false);
	$close = this.$closeState.pipe(
		filter(value => !!value) 
	);

	completeAfter(ms:number){
		return this.interval(ms).pipe(take(1)); // Emits after 1 second

	}

	interval(ms:number){
		return interval(ms).pipe(
			takeUntil(this.$close)
		  ); // Emits after 5 second
	}

	async reload(){
		return new Promise<any>(async (resolve,reject)=>{
			const tmp = await this.storageService.getIfValid('user-temp')
			if(tmp){
				return resolve(tmp)	
			}
			this.storageService.get('user').then(async (user: any) => {
				if(!user){
					return resolve(null)
				}
				
				this.api.setAuth(user.auth_key);
				this.user()
				.pipe(
					takeUntil(this.completeAfter(environment.timeout)),
				)
				.subscribe(
					async (data:any)=>{
					if (data.status.toLowerCase() === 'ok') {
						if(data.data){

							await this.storageService.saveDataWithExpiration('user-temp',data.data)
							this.eventsService.publish('user:renew')
							resolve(data.data)	
						}

					}
					resolve(null) 
				},()=>{
					resolve(null)
				})
			});
		})
		
	}

	user() {
		return this.api.post('auth/user', null);
	}

	async allowed(permissions: string[]) {
		const user = await this.reload();
		if(!user) { return []}
		const allowed:string[] = []
		for (const permission of permissions) {
			if(user.permitions[permission]) {
				allowed.push(permission)
			}
		}
		return allowed 
	}

	async can(permission: string,error:boolean) {
		const user = await this.reload();
		// console.log("user can::",user)
		if(!user || !user.permitions[permission]){
			if(error)
				return this.errorService.error("403")
			return false
		}
		return true
	}

	set(user: any) {
		this.storageService.set('user', user);
		if(!user){
			this.storageService.set('user-temp',null)
		}
		const authkey = user ? user.auth_key : null;
		this.api.setAuth(authkey);
		this.eventsService.publish('user:update', user);
	}

	remove() {
		this._user = null
		this.storageService.set('user', null);
		this.storageService.set('last5',null)
		this.storageService.set('user-temp',null)
		
		this.api.setAuth(undefined);
		this.eventsService.publish('user:logout');
	}

	view() {
		return this.api.get(this.controller + 'view');
	}

	wallet() {
		return this.api.get(this.controller + 'wallet');
	}

	addBracelet(number) {
		return this.api.post(this.controller + 'add-bracelet', { number });
	}

	edit(data: any) {
		return this.api.post(this.controller + 'edit', data);
	}

	delete() {
		return this.api.get(this.controller + 'delete', null);
	}

	setPassword(password: string) {
		return this.api.post(this.controller + 'set-password', { password });
	}

	setImage(file: string) {
		return this.api.post(this.controller + 'set-image', { file });
	}

	covidCertValidate() {
		return this.api.post(this.controller + 'covid-cert-validate', null);
	}

	covidCertDelete() {
		return this.api.get(this.controller + 'covid-cert-delete');
	}

	changeLang(code: any) {
		return this.api.post(this.controller + 'change-language', { code });
	}

	
}
