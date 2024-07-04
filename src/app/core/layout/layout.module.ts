import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/modules/i18n';
import { LayoutComponent } from './layout.component';
import { Routing } from 'src/app/pages/routing';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslationModule,
    TranslateModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {}
