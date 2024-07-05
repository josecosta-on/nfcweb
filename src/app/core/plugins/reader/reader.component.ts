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
  private beep = `data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABQAAAkAAgICAgICAgICAgICAgICAgICAgKCgoKCgoKCgoKCgoKCgoKCgoKCgwMDAwMDAwMDAwMDAwMDAwMDAwMDg4ODg4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC41NAAAAAAAAAAAAAAAACQEUQAAAAAAAAJAk0uXRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAANQAbGeUEQAAHZYZ3fASqD4P5TKBgocg+Bw/8+CAYBA4XB9/4EBAEP4nB9+UOf/6gfUCAIKyjgQ/Kf//wfswAAAwQA/+MYxAYOqrbdkZGQAMA7DJLCsQxNOij///////////+tv///3RWiZGBEhsf/FO/+LoCSFs1dFVS/g8f/4Mhv0nhqAieHleLy/+MYxAYOOrbMAY2gABf/////////////////usPJ66R0wI4boY9/8jQYg//g2SPx1M0N3Z0kVJLIs///Uw4aMyvHJJYmPBYG/+MYxAgPMALBucAQAoGgaBoFQVBUFQWDv6gZBUFQVBUGgaBr5YSgqCoKhIGg7+IQVBUFQVBoGga//SsFSoKnf/iVTEFNRTMu/+MYxAYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV`;
  private audioBeep:any;

  lastChange: number;

  private md5Value: any;
  raw: any;
  icon:string|undefined = undefined
  icons = {
    nfc: 'pricetag',
    barcode: 'scan'
  }
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
    this.audioBeep = new Audio(this.beep)
    this.eventsService.subscribe('intent-read',async (read:IRead)=>{
      const value = await this.filterRepeated(read);
      this.info()
      if(value){
        this.audio()
        this.read.emit(value)
      }
    })
  }

  audio(){
    this.audioBeep.currentTime = 0
    this.audioBeep.play()
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
        this.ngZone.run(()=>{
          this.counter ++
        })
        return
      }
    }

    this.lastChange = new Date().getTime()			
    this.md5Value = md5
    this.ngZone.run(()=>{
      this.clear(1)
      this.raw = value
      this[value.type] = value
      this.icon = this.icons[value.type] || undefined
    })
    return value
  }

  clear(counter=0){
    this.counter = counter
    this.raw = undefined;
    this.nfc = undefined
    this.barcode = undefined
    this.info()
  }

  info(){
    this.readerInfo = this.counter ? `(${this.counter})` : ''
  }

  ngOnInit() {
    
  }

  
}
