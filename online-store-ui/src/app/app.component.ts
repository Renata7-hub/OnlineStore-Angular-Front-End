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
    <mat-toolbar>
      <button mat-icon-button class="example-icon">
        <mat-icon>menu</mat-icon>
      </button>
      <button mat-button style="font-size: 30px" routerLink="/welcome">
      <span>{{title}}</span>
      </button>
      <button mat-button class="example-icon" routerLink="/products" style="font-size: large; font-weight: bold">
        <span>Product list</span>
      </button>
      <button mat-button class="example-icon" routerLink="/cart" style="font-size: large; font-weight: bold"
              [matBadge]="cartSize" matBadgePosition="below">
        <mat-icon>shopping_cart</mat-icon>
      </button>
      <button mat-button class="example-icon" routerLink="/orders" style="font-size: large; font-weight: bold">
        <span>Orders</span>
      </button>
      <span style="flex: 30 15 auto"></span>
      <button mat-button class="example-icon" routerLink="/orders" style="font-size: large; font-weight: bold"
              routerLink="/login" (click)="loginService.changeLoginStatusToFalse()">
        <span>Log out</span>
      </button>
      <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="role == 'ADMIN'" style="flex: 1 1 auto">
        <mat-icon>more_vert</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item routerLink="/storage">
          <mat-icon>dialpad</mat-icon>
          <span>Storage</span>
        </button>
        <button mat-menu-item routerLink="/add-product">
          <mat-icon>dialpad</mat-icon>
          <span>Add product</span>
        </button>
      </mat-menu>
    </mat-toolbar>
<!--    <nav class="navbar navbar-expand navbar-light bg-light" *ngIf="isLogged === 'true'">-->
<!--    <a class="navbar-brand" routerLink="/welcome">{{title}}</a>-->
<!--      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>-->
<!--      <a class="nav-link" [matBadge]="cartSize" matBadgePosition="below" routerLink="/cart">CART</a>-->
<!--      <a class="nav-link" routerLink="/orders">ORDERS</a>-->
<!--&lt;!&ndash;      <a class="nav-link" routerLink="/add-product" *ngIf="role == 'ADMIN'">ADD PRODUCT</a>&ndash;&gt;-->
<!--&lt;!&ndash;      <a class="nav-link" routerLink="/storage" *ngIf="role == 'ADMIN'">STORAGE</a>&ndash;&gt;-->
<!--      <a class="nav-link" routerLink="/login" (click)="loginService.changeLoginStatusToFalse()">LOGOUT</a>-->
<!--    <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="role == 'ADMIN'" style="flex: 1 1 auto">-->
<!--      <mat-icon>more_vert</mat-icon>-->
<!--    </button>-->
<!--    <mat-menu #menu="matMenu">-->
<!--      <button mat-menu-item routerLink="/storage">-->
<!--        <mat-icon>dialpad</mat-icon>-->
<!--        <span>Storage</span>-->
<!--      </button>-->
<!--      <button mat-menu-item routerLink="/add-product">-->
<!--        <mat-icon>dialpad</mat-icon>-->
<!--        <span>Add product</span>-->
<!--      </button>-->
<!--    </mat-menu>-->
<!--      </nav>-->
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


