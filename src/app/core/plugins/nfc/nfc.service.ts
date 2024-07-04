import { Injectable } from '@angular/core';

declare var NDEFReader
declare var document


@Injectable({
  providedIn: 'root',
})
export class NfcService {

    constructor(){
       
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
                console.log(`> Serial Number: ${serialNumber}`);
                console.log(`> Records: (${message.records.length})`);
                });
            } catch (error) {
                console.log("Argh! " + error);
            }
        
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
