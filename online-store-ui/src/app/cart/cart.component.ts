import { Component, OnInit } from '@angular/core';
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { NewOrderComponent } from "../orders/new-order/new-order.component";

// @ts-ignore
//import Any = jasmine.Any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Krepšelis";
  carts: any;

  constructor(
    private cartService: CartService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
      // console.log(this.carts);
    })
  }

  substract(id : number) {

  }

  add(){

  }

  createOrder(){
    this.router.navigate(['orders/new'])
  }


}
