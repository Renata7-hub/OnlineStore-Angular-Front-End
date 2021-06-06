import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  postCart(){
    /*return this.http.post()*/
  }

  getCart(){
    return this.http.get('http://localhost:8080/cart')
  }

  getTotalPrice(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/cart/getTotalPrice');
  }
}
