import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(){
    return this.http.get('http://localhost:8080/purchase/order')
  }

  getOrder(id: string) {
    return this.http.get('http://localhost:8080/purchase/order/'+id)
  }

  getOrderLines(id: string){
    return this.http.get('http://localhost:8080/purchase/order/'+id+'/lines')
  }

}
