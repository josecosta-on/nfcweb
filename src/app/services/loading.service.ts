import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	loading: HTMLIonLoadingElement|undefined;
	constructor(private loadingController: LoadingController) {}

	async show(loading: boolean = true) {
		if (loading && !this.loading) {
			this.loading = await this.loadingController.create({
				spinner: 'crescent',
				mode: 'md',
				cssClass: 'custom-loading'
			});
			await this.loading.present();
		}
	}

	hide(refresher?: any) {
		if (this.loading) {
			this.loading.dismiss();
			this.loading = undefined;
		}

		try {
			refresher.target.complete();
		} catch {}
	}
}
