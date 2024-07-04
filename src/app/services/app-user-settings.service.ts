import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class AppUserSettingsService {
	private controller = 'app-user-settings/';

	constructor(private api: ApiService) {}

	updateTerms(data: any) {
		return this.api.post(this.controller + 'update-terms', data);
	}
}
