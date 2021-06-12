import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
    <style>.flexWrap { display: flex; }</style>
  <nav class="navbar navbar-expand navbar-light bg-light" >
    <a class="navbar-brand">{{title}}</a>
    <ul class="nav nav-pills">
      <li><a class="nav-link" routerLink="/welcome">HOME</a></li>
      <li><a class="nav-link" routerLink="/products">PRODUCT LIST</a></li>
      <li><a class="nav-link" routerLink="/cart">CART</a></li>
      <li><a class="nav-link" routerLink="/orders">ORDERS</a></li>
      <li><a class="nav-link" routerLink="/add-product">ADD PRODUCT</a></li>
      <li><a class="nav-link" routerLink="/storage">STORAGE</a></li>
    </ul>
  </nav>
  <div class="container">
    <router-outlet></router-outlet>
  </div>

  `
})
export class AppComponent implements OnInit {
  title = 'Digital sales outlet';

    constructor() {
  }

  ngOnInit(): void {
    }
}
