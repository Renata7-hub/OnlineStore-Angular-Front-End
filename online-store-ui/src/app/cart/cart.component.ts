import {Component, Input, OnInit} from '@angular/core';
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { NewOrderComponent } from "../orders/new-order/new-order.component";
import {Cart} from "./cart";
import {Storage} from "../storage/storage";
import {ProductService} from "../products/product.service";

// @ts-ignore
//import Any = jasmine.Any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Krepšelis";
  carts: Cart[] = [] ;
  @Input() isNewOrder: boolean = false;
  totalPrice = 0;
  errorMessage = "";
  quantity = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService
    ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
    });
     this.cartService.getTotalPrice().subscribe(data => {
       this.totalPrice = data;
     });
  }

  onDelete(id: number) {
    console.log(id);
    this.carts = this.carts.filter(item => item.id !== id);
    this.cartService.deleteCartEntryById(id)
      .subscribe({
        next: message => {
          message = "Delete succesfull"
        },
        error: err => this.errorMessage = err
      });
  }

  onSubtract(cart: Cart) {
    this.cartService.updateProductOnSubtract(cart)
    this.cartService.subtractQuantityToProduct(cart)
      .subscribe({
        next: message => {
        },
        error: err => this.errorMessage = err
      });
  }

  onAdd(cart: Cart){
    this.cartService.updateProductOnAdd(cart)
    this.totalPrice += cart.product.price;
    this.cartService.addQuantityToProduct(cart)
      .subscribe({
        next: message => {
        },
        error: err => this.errorMessage = err
      });
  }

  createOrder(){
    this.router.navigate(['orders/new'])
  }


}
