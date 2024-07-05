import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { EventsService } from '@app/services/events.service';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import CryptoJS from 'crypto-js';

interface IRead{
  type:string,
  barcode?:Barcode,
  nfc?:any
}

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html'
})
export class ReaderComponent  implements OnInit {
  lastChange: number;

  private md5Value: any;
  value: any;

  nfc: any;
  barcode: any;
  readerInfo:string = ''
	counter: number = 0;


  @Output() read = new EventEmitter<any>();

  constructor(
    private readonly eventsService:EventsService,
    private readonly ngZone:NgZone
  ) {
    window['reader']=this
    this.eventsService.subscribe('intent-read',async (read:IRead)=>{
      const value = await this.filterRepeated(read);
      this.info()
      if(value){
        this.read.emit(value)
      }
    })
  }

  md5OfObject(obj) {
		const jsonString = JSON.stringify(obj, null, 2);  // Stringify with indentation for readability (optional)
		const hash:string = CryptoJS.MD5(jsonString).toString();
		return hash;
	}

  async filterRepeated(value){
    const md5 = this.md5OfObject(value)
    if(value && this.lastChange && this.md5Value == md5){
      const diffInSec = (new Date().getTime() - this.lastChange) / 1000;
      if (diffInSec <= 10){
        this.counter ++
        return
      }
    }

    this.lastChange = new Date().getTime()			
    this.md5Value = md5
    this.ngZone.run(()=>{
      this.clear()
      this[value.type] = value
    })
    return value
  }

  clear(){
    this.counter = 0
    this.value = undefined;
    this.nfc = undefined
    this.barcode = undefined
  }

  info(){
    this.readerInfo = this.counter ? `(${this.counter})` : ''
  }

  ngOnInit() {
    
  }

  
}
