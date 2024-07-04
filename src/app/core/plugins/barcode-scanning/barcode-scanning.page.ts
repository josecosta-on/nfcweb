import { Component, OnInit } from "@angular/core";
import { BarcodeService } from "@app/core/services";

@Component({
  selector: 'app-barcode-scanning',
  templateUrl: './barcode-scanning.page.html'
})
export class BarcodeScanningPage implements OnInit {
  constructor(
    public barcodeService: BarcodeService
  ) {}
  ngOnInit(): void {
    
  }


  
}
