import {Component, Input, OnInit} from '@angular/core';
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { NewOrderComponent } from "../orders/new-order/new-order.component";
import {Cart} from "./cart";
import {Storage} from "../storage/storage";
import {ProductService} from "../products/product.service";
import {MbscFormOptions, mobiscroll} from "@mobiscroll/angular";

// @ts-ignore
//import Any = jasmine.Any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Cart";
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

  onDelete(cart: Cart) {
    this.showRemovedFromCart();
    console.log(cart.id);
    this.carts = this.carts.filter(item => item.id !== cart.id);
    this.totalPrice -= cart.quantity * cart.product.price;
    this.cartService.deleteCartEntryById(cart.id)
      .subscribe({
        next: message => {
          message = "Delete succesfull"
        },
        error: err => this.errorMessage = err
      });
  }

  onSubtract(cart: Cart){
    cart.quantity = cart.quantity - 1;
    console.log(cart);
    this.cartService.updateCart(cart).subscribe(result => cart = result);
  }


/*  onSubtract(cart: Cart) {
    this.cartService.updateProductOnSubtract(cart)
    this.onSubtractUpdateTotalPrice(cart);
    this.cartService.subtractQuantityToProduct(cart)
      .subscribe({
        next: message => {
        },
        error: err => this.errorMessage = err
      });
  }*/

  onAdd(cart: Cart){
/*    this.cartService.updateProductOnAdd(cart)
    this.onAddUpdateTotalPrice(cart);
    this.cartService.addQuantityToProduct(cart)
      .subscribe({
        next: message => {
        },
        error: err => this.errorMessage = err
      });*/
  }

  onAddUpdateTotalPrice(cart:Cart): void {
    if (cart.quantity == 0) {
      return;
    }
      this.totalPrice += cart.product.price;
  }

  onSubtractUpdateTotalPrice(cart:Cart): void {
    if (cart.quantity == 0) {
      this.totalPrice -= cart.product.price;
      if (cart.quantity == 0) {
        return;
      }
    }
    this.totalPrice -= cart.product.price;
  }
  formSettings: MbscFormOptions = {
    theme: 'ios',
    themeVariant: 'light'
  };

  showRemovedFromCart() {
    mobiscroll.toast({
      message: 'Product removed from cart!'
    });
  }

  createOrder(){
    this.router.navigate(['orders/new']);
  }


}
