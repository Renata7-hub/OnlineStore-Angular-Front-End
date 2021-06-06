import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Order} from "./interfaces/order.model";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IOrder} from "./interfaces/order-interface.model";
import {IProduct} from "../products/product";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private getOrdersUrl = "http://localhost:8080/purchase/order";
  private createProductUrl = "http://localhost:8080/product";
  constructor(private http: HttpClient) {
  }

  public getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.getOrdersUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(OrdersService.handleError)
    );
  }


  public getOrder(id: number): Observable<IOrder | undefined> {
    return this.getOrders()
      .pipe(
        map((orders: IOrder[]) => orders.find(p => p.id === id))
      );
  }

  //   postOrder(order: Order){
  //     const headers = { 'content-type': 'application/json'}
  //     const body=JSON.stringify({
  //       "userName": "Jolita",
  //       "userSurname": "Gedminaitė",
  //       "deliveryAddress": "Kaunas",
  //       "orderDate": "2021-06-05"
  //     });
  //
  //     console.log(order)
  //     console.log(body)
  //   return this.http.post<any>('http://localhost:8080/purchase/order', body, {'headers':headers});
  // }


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
