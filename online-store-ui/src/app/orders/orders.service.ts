import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Order} from "./interfaces/order.model";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IOrder} from "./interfaces/order-interface.model";
import {IProduct} from "../products/product";
import {Products} from "../products/products";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private getOrdersUrl = "http://localhost:8080/purchase/order";
  private createOrderUrl = "http://localhost:8080/purchase/order";
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

  public save(order: Order) {
    console.log(order)
    return this.http.post<Order>(this.createOrderUrl, order).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(OrdersService.handleError)
    );
  }


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
