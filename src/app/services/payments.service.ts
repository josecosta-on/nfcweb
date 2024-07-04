import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { flatMap, map } from 'rxjs';

export interface PaymentsOptions{
  limit?:number
  offset?: number
  store_id?: string
  empty:boolean,
  created_at:string,
  query:string
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private controller: string = 'operations/';

  constructor(private api:ApiService) { }

  parseStatus(payment) {
    let status = {};
    try {
      status = JSON.parse(payment.status);
    } catch (error) {
      console.log("Error parsing status:", error);
    }
    return { ...payment, status }; // Destructuring for clarity
  }

  transformResponse(response) {
    let r = { ...response };
    ["payments","refunds"].forEach(element => {
      if (response.data && response.data[element]) {
        const transformedPayments = response.data[element].map((e)=>{
          return this.parseStatus(e)
        });
        r.data[element] = transformedPayments
      }
     
    });
    return r;   
  }

  all(data: PaymentsOptions) {
		return this.api.post(this.controller + 'all', data).pipe(
      map((r)=>{return this.transformResponse(r)})
    );
	}

  one(id: string) {
		return this.api.get(this.controller + 'one', {id}).pipe(
      map((r)=>{return this.transformResponse(r)})

    );
	}

  invoice(operation_id){
    return this.api.get(this.controller + 'invoice', {operation_id})
  }
}
