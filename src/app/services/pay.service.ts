import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface BasePayOptions{
  merchant_id: string
  store_id: string,
  transaction_id?:string
  channel:string
}

export interface OptionalOptions{
    gateway?:string
    client_phone?:string
    bracelet_id?:string
    qr_code?: string
    type:"QRCODE"|"BRACELET"|"PHONE_NUMBER"
}


export interface AmountOptions{
  amount:string
}

export interface TransactionID{
 
  qr_code?: string
  type:"QRCODE"|"BRACELET"|"PHONE_NUMBER"
}

export type PayOptions = BasePayOptions & OptionalOptions & AmountOptions

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private api: ApiService) { }
  private controller: string = 'v1/service/';
  private token: string = 'wpay';

  pay(data: PayOptions) {
		return this.api.post(this.controller + 'paytransaction', data, this.token);
	}

  cancel(data: BasePayOptions) {
		return this.api.post(this.controller + 'cancel', data, this.token);
	}

  refund(data: BasePayOptions) {
		return this.api.post(this.controller + 'refund', data, this.token);
	}

  status(data: BasePayOptions) {
		return this.api.post(this.controller + 'statustransaction', data, "wpay");
	}

  private genRandomString2(length) {
		var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		var charLength = chars.length;
		var result = '';
		for (var i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * charLength));
		}
		return result;
	}

  private generateID(timestamp, randomString):string{
      let auth_data_raw = timestamp + randomString;
      return auth_data_raw
  }

  guid(){
    return this.generateID(new Date().getTime() / 1000, this.genRandomString2(20))

  }


}
