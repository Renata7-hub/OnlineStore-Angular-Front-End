import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "./cart/cart.service";
import {Cart} from "./cart/cart";
import {Subscription} from "rxjs";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  template:`
  <nav class="navbar navbar-expand navbar-light bg-light">
<!--   *ngIf="isLogged"    -->

    <a class="navbar-brand">{{title}}</a>
      <a class="nav-link" routerLink="/welcome">HOME</a>
      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>
      <a class="nav-link" [matBadge]="this.carts.length" matBadgePosition="below" routerLink="/cart">CART</a>
      <a class="nav-link" routerLink="/orders">ORDERS</a>
      <a class="nav-link" routerLink="/add-product">ADD PRODUCT</a>
      <a class="nav-link" routerLink="/storage">STORAGE</a>
      <a class="nav-link" (click)="onClickChangeLoginStatus()" routerLink="/login" >LOGOUT</a>
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
  isLogged: boolean | undefined;
  subscription!: Subscription;

  constructor(private cartService: CartService,
              private loginService: LoginService) {
  }


  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
    });
    // this.subscription = this.loginService.currentMessage.subscribe(message => this.isLogged = message)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickChangeLoginStatus(){
    // this.isLogged = !this.isLogged;
  }

}


