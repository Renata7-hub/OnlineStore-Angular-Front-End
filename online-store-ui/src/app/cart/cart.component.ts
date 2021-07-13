import {Component, Input, OnInit, Output} from '@angular/core';
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import {Cart} from "./cart";
import {ProductService} from "../products/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {error} from "@angular/compiler/src/util";
import {LoginService} from "../login/login.service";
import {Subscription} from "rxjs";
import {Storage} from "../storage/storage";
import {StorageService} from "../storage/storage.service";
import {IStorage} from "../storage/storage.interface";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  pageTitle = "Cart";

  @Input() isNewOrder: boolean = false;
  totalPrice = 0;
  errorMessage = "";
  quantity = 0;
  private userId!: string | null;
  private subscription!: Subscription;
  productAmountInCart!: number;

  carts: Cart[] = [] ;
  storage: IStorage[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private storageService: StorageService
    ) {}

  ngOnInit(): void {
    this.storageService.getAllProductQuantity().subscribe(storage => this.storage = storage);
    this.subscription = this.loginService.currentUserIdStatus.subscribe(setId => this.userId = setId)
    console.log(this.userId);
    this.userId = sessionStorage.getItem('userId');
    this.cartService.getCart(this.userId).subscribe({
      next: data => {
        this.carts = data
      },
      error: err => this.errorMessage = err
    });
     this.cartService.getTotalPrice(this.userId).subscribe({
       next: data => this.totalPrice = data,
       error: err => this.errorMessage = err
     });
  }

  openSnackBarOnDelete() {
    this._snackBar.open('Product removed from cart', 'Dismiss', {
      panelClass: ["custom-style"]
    });
  }

  onDelete(cart: Cart) {
   this.openSnackBarOnDelete()
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
    // this.checkIfAmountOfProductsIsInStorage(cart);
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
    if (cart.quantity == 0) {
      this.totalPrice -= cart.product.price;
      if (cart.quantity == 0) {
        return;
      }
    }
    this.totalPrice -= cart.product.price;
  }

  createOrder(){
    this.router.navigate(['orders/new']);
  }

  checkIfAmountOfProductsIsInStorage(cart: Cart): boolean {
    for (let i = 0; i < this.storage.length; i++) {
      if (cart.product.id == this.storage[i].product.id) {
        if (this.storage[i].quantity == cart.quantity || this.storage[i].quantity > cart.quantity) {
          console.log(this.storage[i].quantity)
          return true;
        }
      }
    }
    return false;
  }
}
