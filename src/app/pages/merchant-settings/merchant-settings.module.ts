import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantSettingsPageRoutingModule } from './merchant-settings-routing.module';

import { MerchantSettingsPage } from './merchant-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantSettingsPageRoutingModule
  ],
  declarations: [MerchantSettingsPage]
})
export class MerchantSettingsPageModule {}
