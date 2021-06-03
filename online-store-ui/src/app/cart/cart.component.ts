import { Component, OnInit } from '@angular/core';
import { CartService} from "./cart.service";

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

  constructor(private cartService: CartService) { }

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


}
