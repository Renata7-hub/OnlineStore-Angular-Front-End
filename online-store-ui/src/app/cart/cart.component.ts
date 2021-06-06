import {Component, Input, OnInit} from '@angular/core';
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
  @Input() isNewOrder: boolean = false;
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
    });
     this.cartService.getTotalPrice().subscribe(data => {
       this.totalPrice = data;
     });
  }

  onDelete(id: number): void {
    // this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    // this.productService.deleteProductById(id)
    //   .subscribe({
    //     next: message => {
    //       message = "Delete succesfull"
    //     },
    //     error: err => this.errorMessage = err
    //   });
  }

  substract(id : number) {

  }

  add(){

  }

  createOrder(){
    this.router.navigate(['orders/new'])
  }


}
