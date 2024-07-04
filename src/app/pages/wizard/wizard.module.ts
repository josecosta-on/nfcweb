import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WizardPageRoutingModule } from './wizard-routing.module';

import { WizardPage } from './wizard.page';
import { WzLocationComponent } from './wz-location/wz-location.component';
import { WzDoneComponent } from './wz-done/wz-done.component';
import { ComponentsModule } from '@app/core/layout/components/components.module';
import { TranslationModule } from '@app/modules/i18n';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    WzLocationComponent,
    WzDoneComponent,
    WizardPage
  ],
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    TranslationModule,
    WizardPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ]
})
export class WizardPageModule {}
