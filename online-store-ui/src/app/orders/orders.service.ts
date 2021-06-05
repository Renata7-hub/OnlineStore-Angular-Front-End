import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Order} from "./interfaces/order.model";
import {throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

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

/*  postOrder(order: Order){
    console.log(order)
    return this.http.post<any>('http://localhost:8080/purchase/order', JSON.stringify(order)).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(OrdersService.handleError)
    );
  }*/
    postOrder(order: Order){
      const headers = { 'content-type': 'application/json'}
      const body=JSON.stringify({
        "userName": "Jolita",
        "userSurname": "Gedminaitė",
        "deliveryAddress": "Kaunas",
        "orderDate": "2021-06-05"
      });

      console.log(order)
      console.log(body)
    return this.http.post<any>('http://localhost:8080/purchase/order', body, {'headers':headers});
  }

/*  postOrder(order: any){

    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify({
      "userName": "Jolita",
      "userSurname": "Gedminaitė",
      "deliveryAddress": "Kaunas",
      "orderDate": "2021-06-05"
    });
    console.log(JSON.stringify(order))
    console.log(body)
    return this.http.post('http://localhost:8080/purchase/order/', body, {'headers':headers})

    this.http.get('http://localhost:8080/purchase/order').subscribe(data => {
      order = data;
      console.log(order);
    })

  }*/



  private static handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }

}
