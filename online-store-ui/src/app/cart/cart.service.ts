import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Cart} from "./cart";
import {IProduct} from "../products/product";
import { tap} from "rxjs/operators";
import {CartModelToCart} from "./cart.model-to-cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private getAllProductsUrl = 'http://localhost:8080/cart/';
  private getTotalPriceUrl = 'http://localhost:8080/cart/getTotalPrice/';
  private addToCartUrl = 'http://localhost:8080/cart/';
  private removeFromCartProductUrl = 'http://localhost:8080/cart/';
  private changeProductQuantityInCartUrl = 'http://localhost:8080/cart';
  private userId = sessionStorage.getItem('user_id');

  constructor(private http: HttpClient) { }

  public deleteCartEntryById(id: number) {
    return this.http.delete(this.removeFromCartProductUrl + id)
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.getAllProductsUrl + this.userId).pipe(
      tap(data => console.log("All", JSON.stringify(data)))
    );
  }

  addProductToCart(product: IProduct | undefined) {
    var newProduct = {
      productId: product!.id,
      quantity: 1
    }
      return this.http.post<CartModelToCart>(this.addToCartUrl + this.userId, newProduct).pipe(
        tap(data => console.log("All", JSON.stringify(data)))
      );
  }

  updateProductOnAdd(selectedProduct: Cart): void {
    selectedProduct.quantity += 1;
  }

  updateProductOnSubtract(selectedProduct: Cart): void {
    if (selectedProduct.quantity <= 0) {
      return;
    }
    selectedProduct.quantity -= 1;
  }

  addQuantityToProduct(cart: Cart) {
    console.log(cart);
    return this.http.put<Cart>(this.changeProductQuantityInCartUrl, cart).pipe(
      tap(data => console.log("All", JSON.stringify(data)))
    );
  }

  subtractQuantityToProduct(cart: Cart) {
    console.log(cart);
    return this.http.put<Cart>(this.changeProductQuantityInCartUrl, cart).pipe(
      tap(data => console.log("All", JSON.stringify(data)))
    );
  }

  getTotalPrice(): Observable<number> {
    return this.http.get<number>(this.getTotalPriceUrl + this.userId);
  }
}
