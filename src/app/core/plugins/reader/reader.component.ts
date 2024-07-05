import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventsService } from '@app/services/events.service';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';

interface IRead{
  type:string,
  barcode?:Barcode,
  nfc
}

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html'
})
export class ReaderComponent  implements OnInit {
  @Output() read = new EventEmitter<any>();

  constructor(private readonly eventsService:EventsService) {
    this.eventsService.subscribe('intent-read',(read:IRead)=>{
      this.read.emit(read)
    })
  }

  ngOnInit() {

  }

  
}
