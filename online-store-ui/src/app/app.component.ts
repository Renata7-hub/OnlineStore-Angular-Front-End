import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "./cart/cart.service";
import {Cart} from "./cart/cart";

@Component({
  selector: 'app-root',
  template:`
  <nav class="navbar navbar-expand navbar-light bg-light">
    <a class="navbar-brand">{{title}}</a>
      <a class="nav-link" routerLink="/welcome">HOME</a>
      <a class="nav-link" routerLink="/products">PRODUCT LIST</a>
      <a class="nav-link" [matBadge]="this.carts.length" matBadgePosition="below" routerLink="/cart">CART</a>
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
  carts: Cart[] = [] ;

    constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
    });
    }
}
