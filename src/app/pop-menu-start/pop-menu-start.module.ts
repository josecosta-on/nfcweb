import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopMenuStartPageRoutingModule } from './pop-menu-start-routing.module';

import { PopMenuStartPage } from './pop-menu-start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopMenuStartPageRoutingModule
  ],
  declarations: [PopMenuStartPage]
})
export class PopMenuStartPageModule {}
