import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class ToastService {
	constructor(public toastController: ToastController) {}

	async show(color: string, message: string, position: 'bottom' | 'middle' | 'top' = 'top', duration: number = 2000, buttons: any = null) {
		const toast = await this.toastController.create({
			color: color,
			message: message,
			position: position,
			duration: duration,
			buttons: buttons
		});

		toast.present();
	}

	async showGenericError() {
		const toast = await this.toastController.create({
			message: 'Ocorreu um erro, verifique a sua ligação à internet.',
			duration: 4000,
			position: 'top',
			cssClass: 'error'
		});

		toast.present();
	}
}
