import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopMenuDashPage } from './pop-menu-dash.page';

const routes: Routes = [
  {
    path: '',
    component: PopMenuDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopMenuDashPageRoutingModule {}
