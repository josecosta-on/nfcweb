import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopMenuStartPage } from './pop-menu-start.page';

const routes: Routes = [
  {
    path: '',
    component: PopMenuStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopMenuStartPageRoutingModule {}
