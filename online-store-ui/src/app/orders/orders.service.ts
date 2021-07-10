import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Order} from "./interfaces/order.model";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {IOrder} from "./interfaces/order-interface.model";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private getOrdersUrl = "http://localhost:8080/purchase/order/";
  private createOrderUrl = "http://localhost:8080/purchase/order";
  private cartOrderLineUrl = 'http://localhost:8080/purchase/order/';
  private cartTotalCostUrl = 'http://localhost:8080/purchase/order/totals';
  private userId = sessionStorage.getItem('userId');
  constructor(private http: HttpClient,
              public datePipe: DatePipe) {
  }

  public getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.getOrdersUrl + this.userId).pipe(
      tap(/*data => console.log("All", JSON.stringify(data))*/),
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
    return this.http.post<any>(this.createOrderUrl, order).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(OrdersService.handleError)
    );
  }

  getOrderLines(id: string){
    return this.http.get(this.cartOrderLineUrl + id + '/lines');
  }

  getOrdersTotalCost(){
    return this.http.get(this.cartTotalCostUrl);
  }

  getOrderTotalCost(id: number): Observable<number> {
    return this.http.get<number>('http://localhost:8080/purchase/order/'+id+'/total');
  }

  public createOrderLinesFromCart(orderId: number) {
    return this.http.post<any>("http://localhost:8080/purchase/order/lines/moveFromCart?purchase_order_id="+orderId, "{purchase_order_id: orderId}").pipe(
      tap(/*data => console.log("All", JSON.stringify(data))*/),
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
