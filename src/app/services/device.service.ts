import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from './api.service';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '@env/environment';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DeviceService {
	device_identifier: any = null;

	constructor(private api: ApiService, public platform: Platform, private storageService: StorageService) {
		this.storageService.get('device_identifier').then((device: any) => {
			if (device) {
				this.device_identifier = device;
			}
		});
	}

	create(push_token: string) {
		const data = {
			push_token,
			device_identifier: this.device_identifier,
			app_version: environment.version,
			client_type: this.detectBrowserName()
		};
		return this.api.post('device/create', data);
	}

	detectBrowserName() {
		const agent = window.navigator.userAgent.toLowerCase();
		switch (true) {
			case agent.indexOf('edge') > -1:
				return 'edge';
			case agent.indexOf('opr') > -1 && !!(<any>window).opr:
				return 'opera';
			case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
				return 'chrome';
			case agent.indexOf('trident') > -1:
				return 'ie';
			case agent.indexOf('firefox') > -1:
				return 'firefox';
			case agent.indexOf('safari') > -1:
				return 'safari';
			default:
				return 'other';
		}
	}

	detectBrowserVersion() {
		var userAgent = navigator.userAgent,
			tem,
			matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

		if (/trident/i.test(matchTest[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
			return 'IE ' + (tem[1] || '');
		}

		if (matchTest[1] === 'Chrome') {
			tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}

		matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];

		if ((tem = userAgent.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
		return matchTest.join(' ');
	}
}
