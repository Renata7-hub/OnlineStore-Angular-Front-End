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
  /*brews: Any = new Any;*/

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
      console.log(this.carts);
    })

/*    this.cartService.getBeer().subscribe(data => {
      this.brews = data;
      console.log(this.brews);
    });*/
  }

  substract(id : number) {
    //console.log(this.carts.get(id));
    //console.log("tekstas");
  }

  add(){

  }


}
