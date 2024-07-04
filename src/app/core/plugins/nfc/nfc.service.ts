import { Injectable } from '@angular/core';

declare var NDEFReader
declare var document


@Injectable({
  providedIn: 'root',
})
export class NfcService {
   
    async startScan(){
        document.querySelector("#scanNfcButton").onclick = async () => {
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
    }


    async stopScan() {
      
    }
    
}
