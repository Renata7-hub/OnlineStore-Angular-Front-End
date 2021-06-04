import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import Order = jasmine.Order;

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

  postOrder(order: Order){
    console.log(order)
    return this.http.post('http://localhost:8080/purchase/order', order);
  }

}
