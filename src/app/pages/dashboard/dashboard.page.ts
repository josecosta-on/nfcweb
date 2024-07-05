import { Component, OnInit } from '@angular/core';
import { BarcodeService } from '@app/core';
import { BasePage } from '@app/core/layout/base/base.page';
import { NfcService } from '@app/core/plugins/reader/components/nfc/nfc.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePage implements OnInit {

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
    const barcode = await this.barcodeService.startScan();
    alert(barcode?.rawValue)

  }



  async scan(): Promise<void> {
  
  }
  

}
