import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { NfcService } from "./nfc.service";

@Component({
  selector: 'app-nfc',
  template: `
      <div #scanNfcButton id="scanNfcButton"></div>
  `
})
export class NfcComponent
  implements  AfterViewInit, OnDestroy
{
  constructor (private readonly nfcService:NfcService){}
  
  public ngOnInit(): void {
    
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.nfcService.startScan();
    }, 500);
  }

  public ngOnDestroy(): void {
    this.nfcService.stopScan();
  }

}
