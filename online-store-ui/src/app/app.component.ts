import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
  <nav class="navbar navbar-expand navbar-light bg-light" *ngIf="!isUserLoggedIn">
    <a class="navbar-brand">{{title}}</a>
      <a class="nav-link" routerLink="/welcome">HOME</a>
      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>
      <a class="nav-link" routerLink="/cart">CART</a>
      <a class="nav-link" routerLink="/orders">ORDERS</a>
      <a class="nav-link" routerLink="/add-product">ADD PRODUCT</a>
      <a class="nav-link" routerLink="/storage">STORAGE</a>
      <a class="nav-link" style="text-align: right" routerLink="/#" >LOGOUT</a>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
  </div>

  `
})
export class AppComponent implements OnInit {
  title = 'Digital sales outlet';
  @Input() public isUserLoggedIn: boolean | undefined;

    constructor() {
  }

  ngOnInit(): void {
    }
}
