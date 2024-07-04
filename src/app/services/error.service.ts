import { Injectable } from '@angular/core';
import { NavigationService } from './navigation.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public navCtrl: NavController) { 

  }

  error(code:string){
    this.navCtrl.navigateRoot(`error/${code}`)
  }
}
