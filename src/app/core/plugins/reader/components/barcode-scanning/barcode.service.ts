import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService } from '@app/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { BarcodeScanningModalComponent } from '@app/core/plugins/reader/components/barcode-scanning/barcode-scanning-modal.component';
import { EventsService } from '@app/services/events.service';
import { ScanComponent } from './components/scan/scan.component';


@Injectable({
  providedIn: 'root',
})
export class BarcodeService {
    public readonly barcodeFormat = BarcodeFormat;
    public readonly lensFacing = LensFacing;
  
    public formGroup = new UntypedFormGroup({
      formats: new UntypedFormControl([]),
      lensFacing: new UntypedFormControl(LensFacing.Back),
      googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
      googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
    });
    public barcodes: Barcode[] = [];
    public isSupported = false;
    public isPermissionGranted = false;
  
   
    word: string = '';
    listenScan:boolean = true;
    allowedCharsRegex = /^[a-zA-Z0-9!@#$%&*()_+\-=\[\]{};':",./\\|<>? ]+$/;

  
    constructor(
      private readonly dialogService: DialogService,
      private readonly ngZone: NgZone,
      private readonly eventsService: EventsService
    ) {
      document.addEventListener('keyup', async(e:any) => {
        if(!this.listenScan){
            return
        }

        const char = String.fromCharCode(e.which || e.keyCode);
        const isAllowed = this.allowedCharsRegex.test(char);
        console.log("e::",e,isAllowed)
        if ( !isAllowed) {
          return
        }

        if (e.key === 'Enter') {
          console.log(this.word)
          
          this.eventsService.publish('intent-read',{
            type:'barcode',
            value:this.word
          })
          this.word=""
          return 
        }
        this.word = this.word + char
        return
      });
    }
  
    public ngOnInit(): void {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
      BarcodeScanner.checkPermissions().then((result) => {
        this.isPermissionGranted = result.camera === 'granted';
      });
      BarcodeScanner.removeAllListeners().then(() => {
        BarcodeScanner.addListener(
          'googleBarcodeScannerModuleInstallProgress',
          (event) => {
            this.ngZone.run(() => {
              console.log('googleBarcodeScannerModuleInstallProgress', event);
              const { state, progress } = event;
              this.formGroup.patchValue({
                googleBarcodeScannerModuleInstallState: state,
                googleBarcodeScannerModuleInstallProgress: progress,
              });
            });
          },
        );
      });
    }
  
    public async startScan(): Promise<Barcode|undefined> {
      const formats = this.formGroup.get('formats')?.value || [];
      const lensFacing =
        this.formGroup.get('lensFacing')?.value || LensFacing.Back;
        const element = await this.dialogService.showModal({
            component: ScanComponent,
            // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
            cssClass: 'barcode-scanning-modal',
            showBackdrop: false,
            componentProps: {
            formats: formats,
            lensFacing: lensFacing,
            },
        });
        const result = await element.onDidDismiss()
      
        const barcode: Barcode | undefined = result.data?.barcode;
        if (barcode) {
            this.barcodes = [barcode];
            this.eventsService.publish('intent-read',{
              type:'barcode',
              value:barcode.rawValue
            })
            return barcode
        }
        return undefined
        

       
    }
  
    public async readBarcodeFromImage(): Promise<void> {
      const { files } = await FilePicker.pickImages({ limit: 1 });
      const path = files[0]?.path;
      if (!path) {
        return;
      }
      const formats = this.formGroup.get('formats')?.value || [];
      const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
        path,
        formats,
      });
      this.barcodes = barcodes;
    }
  
    public async scan(): Promise<void> {
      const formats = this.formGroup.get('formats')?.value || [];
      const { barcodes } = await BarcodeScanner.scan({
        formats,
      });
      this.barcodes = barcodes;
    }
  
    public async openSettings(): Promise<void> {
      await BarcodeScanner.openSettings();
    }
  
    public async installGoogleBarcodeScannerModule(): Promise<void> {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
    }
  
    public async requestPermissions(): Promise<void> {
      await BarcodeScanner.requestPermissions();
    }
  
   
}
