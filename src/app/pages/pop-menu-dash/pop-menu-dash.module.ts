import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopMenuDashPageRoutingModule } from './pop-menu-dash-routing.module';

import { PopMenuDashPage } from './pop-menu-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopMenuDashPageRoutingModule
  ],
  declarations: [PopMenuDashPage]
})
export class PopMenuDashPageModule {}
