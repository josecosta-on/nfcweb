import { Injectable } from '@angular/core';
import { EventsService } from '@app/services/events.service';
import { NfcUtil } from '@awesome-cordova-plugins/nfc';

declare var NDEFReader
declare var document


@Injectable({
  providedIn: 'root',
})
export class NfcService {
    private beep = `data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABQAAAkAAgICAgICAgICAgICAgICAgICAgKCgoKCgoKCgoKCgoKCgoKCgoKCgwMDAwMDAwMDAwMDAwMDAwMDAwMDg4ODg4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC41NAAAAAAAAAAAAAAAACQEUQAAAAAAAAJAk0uXRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAANQAbGeUEQAAHZYZ3fASqD4P5TKBgocg+Bw/8+CAYBA4XB9/4EBAEP4nB9+UOf/6gfUCAIKyjgQ/Kf//wfswAAAwQA/+MYxAYOqrbdkZGQAMA7DJLCsQxNOij///////////+tv///3RWiZGBEhsf/FO/+LoCSFs1dFVS/g8f/4Mhv0nhqAieHleLy/+MYxAYOOrbMAY2gABf/////////////////usPJ66R0wI4boY9/8jQYg//g2SPx1M0N3Z0kVJLIs///Uw4aMyvHJJYmPBYG/+MYxAgPMALBucAQAoGgaBoFQVBUFQWDv6gZBUFQVBUGgaBr5YSgqCoKhIGg7+IQVBUFQVBoGga//SsFSoKnf/iVTEFNRTMu/+MYxAYAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV`;
    private audioBeep:any;


    constructor(private readonly eventsServices:EventsService){
        this.audioBeep = new Audio(this.beep);
    }

    async setup(){
        
        
            try {
                const ndef = new NDEFReader();
                window['ndef'] = ndef
                await ndef.scan();
                console.log("> Scan started");
            
                ndef.addEventListener("readingerror", () => {
                console.log("Argh! Cannot read data from the NFC tag. Try another one?");
                });
            
                ndef.addEventListener("reading", ({ message, serialNumber }) => {
                this.audio()
                this.eventsServices.publish('intent-read',{
                    type:'nfc',
                    value:this.toHexString(serialNumber)
                })
                console.log(`> Serial Number: ${serialNumber}`);
                console.log(`> Records: (${message.records.length})`);
                });
            } catch (error) {
                console.log("Argh! " + error);
            }
        
    }

    audio(){
      
       try {
            this.audioBeep.currentTime = 0;
            this.audioBeep.play()
       } catch (error) {
        
       }
    }
   
    toHexString (str) {
        const characters = str.trim().split(':');
        characters.reverse();
        const reversedString = characters.join('');
        return reversedString.toUpperCase();
	}

    async startScan(){

        // Get a reference to the element you want to click
        var element = document.getElementById("scanNfcButton");
        // Create a new click event
        var clickEvent = new Event('click');
        // Dispatch the click event on the element
        element.dispatchEvent(clickEvent);

        
    }


    async stopScan() {
      
    }
    
}
