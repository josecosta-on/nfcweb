import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private controller = 'app/';

	constructor(private api: ApiService) {}

	view() {
		return this.api.get(this.controller + 'view');
	}
}
