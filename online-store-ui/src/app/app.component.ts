import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CartService} from "./cart/cart.service";
import {Cart} from "./cart/cart";
import { Subscription} from "rxjs";
import {LoginService} from "./login/login.service";

@Component({
  selector: 'app-root',
  template:`
  <nav class="navbar navbar-expand navbar-light bg-light" *ngIf="isLogged === 'true'">
    <a class="navbar-brand" routerLink="/welcome">{{title}}</a>
      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>
      <a class="nav-link" [matBadge]="cartSize" matBadgePosition="below" routerLink="/cart">CART</a>
      <a class="nav-link" routerLink="/orders">ORDERS</a>
      <a class="nav-link" routerLink="/add-product" *ngIf="role == 'ADMIN'">ADD PRODUCT</a>
      <a class="nav-link" routerLink="/storage" *ngIf="role == 'ADMIN'">STORAGE</a>
      <a class="nav-link" routerLink="/login" (click)="loginService.changeLoginStatusToFalse()">LOGOUT</a>
  </nav>
  <div class="container">
    <br>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Digital sales outlet';
  carts: Cart[] = [];
  role = sessionStorage.getItem('role');
  isLogged: string | null = 'false';
  cartSize!: number;
  subscription!: Subscription;

  constructor(private cartService: CartService,
              public loginService: LoginService) {
  }


  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
      this.cartSize = data.length ;
    });
    this.subscription = this.loginService.currentLoggedStatus.subscribe(statusLogged => this.isLogged = statusLogged);
    this.isLogged = sessionStorage.getItem('isLogged')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


