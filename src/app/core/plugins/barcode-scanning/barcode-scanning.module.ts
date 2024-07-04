import { NgModule } from '@angular/core';

import { BarcodeScanningRoutingModule } from './barcode-scanning-routing.module';

import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanningPage } from './barcode-scanning.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [ SharedModule,BarcodeScanningRoutingModule],
  declarations: [BarcodeScanningPage, BarcodeScanningModalComponent],
})
export class BarcodeScanningModule {}
