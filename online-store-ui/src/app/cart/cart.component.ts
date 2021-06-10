import {Component, Input, OnInit} from '@angular/core';
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import {Cart} from "./cart";
import {StorageService} from "../storage/storage.service";
import {IStorage} from "../storage/storage.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Cart";
  carts: Cart[] = [] ;
  storage: IStorage[] = [];
  @Input() isNewOrder: boolean = false;
  totalPrice = 0;
  errorMessage = "";
  quantity = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private storageService: StorageService
    ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      this.carts = data;
    });
     this.cartService.getTotalPrice().subscribe(data => {
       this.totalPrice = data;
     });
    this.storageService.getProductsInStorage().subscribe(data => {
      this.storage = data;
    });
  }

  onDelete(cart: Cart) {
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

  onSubtract(cart: Cart) {
    this.cartService.updateProductOnSubtract(cart)
    this.onSubtractUpdateTotalPrice(cart);
    this.cartService.subtractQuantityToProduct(cart)
      .subscribe({
        next: message => {
        },
        error: err => this.errorMessage = err
      });
  }

  onAdd(cart: Cart){
    this.cartService.updateProductOnAdd(cart)
    this.onAddUpdateTotalPrice(cart);
    this.cartService.addQuantityToProduct(cart)
      .subscribe({
        next: message => {
            },
        error: err => this.errorMessage = err
      });
  }

  onAddUpdateTotalPrice(cart:Cart): void {
    if (cart.quantity == 0) {
      return;
    }
      this.totalPrice += cart.product.price;
  }

  onSubtractUpdateTotalPrice(cart:Cart): void {
      this.cartService.getTotalPrice().subscribe(data => {
        this.totalPrice = data;
      });
  }

  // onAddCheckIfProductInStorage(cart:Cart, storage:IStorage): void {
  //   if (cart.quantity => storage.quantity)
  // }

  createOrder(){
    this.router.navigate(['orders/new']);
  }


}
