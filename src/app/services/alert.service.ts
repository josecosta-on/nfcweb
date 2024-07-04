import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	constructor(public alertController: AlertController) { }

	async show(
		title: string,
		subtitle: string,
		message: string,
		buttons?: any
	) {
		const alert = await this.alertController.create({
			header: title,
			subHeader: subtitle,
			message: message,
			buttons: buttons ? buttons : ['OK']
		});

		await alert.present();
	}
}
