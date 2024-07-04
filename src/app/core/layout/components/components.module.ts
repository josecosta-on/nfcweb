import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/modules/i18n';
import { SelectComponent } from './select/select.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslationModule,
    TranslateModule,
  ],
  exports: [],
})
export class ComponentsModule {}
