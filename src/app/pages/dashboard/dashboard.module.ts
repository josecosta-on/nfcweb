import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { NfcComponent } from '@app/core/plugins/reader/components/nfc/nfc.component';
import { ReaderComponent } from '@app/core/plugins/reader/reader.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

// Necessary to solve the problem of losing internet connection
LOAD_WASM().subscribe();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NgxScannerQrcodeModule
  ],
  declarations: [DashboardPage,NfcComponent,ReaderComponent]
})
export class DashboardPageModule {}
