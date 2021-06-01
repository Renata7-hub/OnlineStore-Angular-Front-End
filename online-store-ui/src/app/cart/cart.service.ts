import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  getBeer(){
    return this.http.get('http://localhost:8080/product/quantity/onDate?date=2021-05-31')
  }
}