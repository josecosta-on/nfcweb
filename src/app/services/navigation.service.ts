import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	redirectUrl: string = '';
	constructor(private navCtrl: NavController) {}

	goBack() {
		return this.navCtrl.pop();
	}

	navigateRoot() {
		return this.navCtrl.navigateRoot('/');
	}

	getRedirect() {
		return this.redirectUrl;
	}

	setRedirect(url) {
		this.redirectUrl = url;
	}
}
