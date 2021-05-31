import { Component, OnInit } from '@angular/core';
import { CartService} from "./cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Krepšelis";
  cart: Object = new Object;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.cart = data;
      console.log(this.cart);
    })
  }



}
