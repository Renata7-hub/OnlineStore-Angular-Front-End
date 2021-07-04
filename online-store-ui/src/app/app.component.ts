import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CartService} from "./cart/cart.service";
import {Cart} from "./cart/cart";
import { Subscription} from "rxjs";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  template:`
  <nav class="navbar navbar-expand navbar-light bg-light" *ngIf="isLogged == true">
<!--   *ngIf="isLogged == true"   -->

    <a class="navbar-brand" routerLink="/welcome">{{title}}</a>
      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>
      <a class="nav-link" [matBadge]="cartSize" matBadgePosition="below" routerLink="/cart">CART</a>
      <a class="nav-link" routerLink="/orders">ORDERS</a>
      <a class="nav-link" routerLink="/add-product" *ngIf="this.role == 'ADMIN' ">ADD PRODUCT</a>
      <a class="nav-link" routerLink="/storage" *ngIf="this.role == 'ADMIN'">STORAGE</a>
      <a class="nav-link" routerLink="/login" >LOGOUT</a>
  </nav>
  <div class="container">
    <br>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Digital sales outlet';
  carts: Cart[] = [];
  isLogged = true;
  role!: any;
  subscription!: Subscription;
  cartSize!: number;


  constructor(private cartService: CartService,
              private loginService: LoginService) {
  }


  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
      this.cartSize = data.length ;
    });
    this.subscription = this.role.currentMessage.subscribe((role: any) => this.role = role)
  }


  loginStatus(event: any) {
    console.log(event);
    this.isLogged = event;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


