import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowQrPageRoutingModule } from './show-qr-routing.module';

import { ShowQrPage } from './show-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowQrPageRoutingModule
  ],
  declarations: [ShowQrPage]
})
export class ShowQrPageModule {}
