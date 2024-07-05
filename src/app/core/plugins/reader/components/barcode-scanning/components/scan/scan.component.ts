import { Component, Input, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeModule, ScannerQRCodeConfig, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { EventsService } from '@app/services/events.service';
import { DialogService } from '@app/core/services';

@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule, TranslateModule, NgxScannerQrcodeModule]
})
export class ScanComponent {
	@ViewChild('action') action: NgxScannerQrcodeComponent;
	@Input() description: string = 'Aponta a câmara do telemóvel para o QR Code e aguarda';

	public config: ScannerQRCodeConfig = {
		constraints: {
			video: {
				height: { min:window.screen.height },
				// width: { min: window.screen.width },
				// aspectRatio: 9 / 16,
				facingMode: 'environment' // or "environment" for the back camera
			},
			audio: false
		}
	};

  constructor(
    private readonly dialogService: DialogService,
  ) {}

	ngAfterViewInit() {
		this.action.isReady.subscribe(async (res: any) => {
			let el:any = document.querySelector(".video-frame")
			el.style.overflow="hidden"
			el.style.height="100%"
			this.handle(this.action, 'start');
		});
	}

	ngOnDestroy() {
		this.handle(this.action, 'stop');
	}

	public onEvent(e: ScannerQRCodeResult[], action?: any): void {
		if (e && action) {
      console.log("e:",e)
      const v = e[0].value;
			action.stop();
      this.closeModal({rawValue:v})
    
		}
	}


	handle(action: any, fn: string): void {
		const playDeviceFacingBack = (devices: any[]) => {
			console.log(devices);
			const device = devices.find((f) => /back|trás|rear|traseira|environment|ambiente/gi.test(f.label));
			action.playDevice(device ? device.deviceId : devices[0].deviceId);
		};

		if (fn === 'start') {
			action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
		} else {
			action[fn]().subscribe((r: any) => console.log(fn, r), alert);
		}
	}

  public async closeModal(barcode?: any): Promise<void> {
    this.dialogService.dismissModal({
      barcode: barcode,
    });
  }

}
