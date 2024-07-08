import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { EventsService } from '@app/services/events.service';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import CryptoJS from 'crypto-js';
import { AssetsReader } from './assets/reader';


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
  forceFocus: any;

  constructor(
    private readonly eventsService:EventsService,
    private readonly ngZone:NgZone
  ) {
    window['reader']=this
    this.audioBeep = new Audio(AssetsReader.beep)
    this.audioBeep.muted = true;
    document.addEventListener('click', () => {
      this.audioBeep.muted = false;
    });

   
   

    this.eventsService.subscribe('intent-read',async (read:IRead)=>{
      const value = await this.filterRepeated(read);
      this.info()
      if(value){
        this.audio()
        this.read.emit(value)
      }
    })
  }

  ngAfterViewInit() {
    this.setup()
	}

  ngOnDestroy(): void {
    clearInterval(this.forceFocus)
  }

  public setup(){
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.placeholder = "";
    
    const targetElement = document.getElementsByTagName("app-reader")[0];
    targetElement.appendChild(newInput);
    let input:any = document.querySelector("app-reader input")
    if(input){
     
      input.addEventListener("focus", () =>{
        input.select(); // Select all text within the input
        setTimeout(() => {
            input.removeAttribute("readOnly")
        }, 200);
      });
     
      input.style.position = 'fixed'
      input.style.top = '-200px'
      input.inputmode="none"
      input.autofocus="true"
      input.readOnly="readonly"
      this.forceFocus = setInterval(()=>{
        input.focus()
      },100)
    }
   
    


   
  }

  audio(){
    try {
      this.audioBeep.currentTime = 0
      this.audioBeep.play()   
    } catch (error) {
      
    }
   
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
        return undefined
      }
    }

   
    this.ngZone.run(()=>{
      this.clear(1)
      this.raw = value
      this[value.type] = value
      this.icon = this.icons[value.type] || undefined
      this.lastChange = new Date().getTime()			
      this.md5Value = md5
      return value
    })
 
    
  }

  clear(counter=0){
    this.md5Value = undefined
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
