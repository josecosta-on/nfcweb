import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WizardPage } from './wizard.page';
import { WzDoneComponent } from './wz-done/wz-done.component';
import { WzLocationComponent } from './wz-location/wz-location.component';

const routes: Routes = [
  {
    path: '',
    data: { animation: 'slideInAnimation' },
    component: WizardPage,
    children: [
      {
        path: '',
        redirectTo: 'location',
        pathMatch: 'full',
      },
      {
        path: 'location',
        component: WzLocationComponent,
      },
      {
        path: 'done',
        component: WzDoneComponent,
      },
      { path: '', redirectTo: 'location', pathMatch: 'full' },
      { path: '**', redirectTo: 'location', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardPageRoutingModule {}
