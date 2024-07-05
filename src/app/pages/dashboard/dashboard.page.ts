import { Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeService } from '@app/core';
import { BasePage } from '@app/core/layout/base/base.page';
import { NfcService } from '@app/core/plugins/reader/components/nfc/nfc.service';
import { ReaderComponent } from '@app/core/plugins/reader/reader.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePage implements OnInit {
  @ViewChild('reader') reader: ReaderComponent | undefined;

  constructor(
    private readonly barcodeService: BarcodeService,
    private readonly nfcService: NfcService
  ) {
    super()
  }

  ngOnInit() {
  
  }

  async scanNfc(){
    this.nfcService.startScan();
   
  }

  clear(){
    alert("clear")
  }

  async read(event){
    console.log(event)
  }

  async scanQRCode(){
    await this.barcodeService.startScan();

  }



  async scan(): Promise<void> {
  
  }
  

}
