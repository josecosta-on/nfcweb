import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectLangPageRoutingModule } from './select-lang-routing.module';

import { SelectLangPage } from './select-lang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectLangPageRoutingModule
  ],
  declarations: [SelectLangPage]
})
export class SelectLangPageModule {}
