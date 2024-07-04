import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowQrPage } from './show-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ShowQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowQrPageRoutingModule {}
