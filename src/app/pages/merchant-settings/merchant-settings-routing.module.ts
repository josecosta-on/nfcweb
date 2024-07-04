import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantSettingsPage } from './merchant-settings.page';

const routes: Routes = [
  {
    path: '',
    component: MerchantSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantSettingsPageRoutingModule {}
