import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from "rxjs";
import {Cart} from "./cart";
import {IProduct} from "../products/product";
import { tap} from "rxjs/operators";
import {CartModelToCart} from "./cart.model-to-cart";
import {LoginService} from "../login/login.service";
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class CartService{
  private getAllProductsUrl = 'http://localhost:8080/cart/';
  private getTotalPriceUrl = 'http://localhost:8080/cart/getTotalPrice/';
  private addToCartUrl = 'http://localhost:8080/cart/';
  private removeFromCartProductUrl = 'http://localhost:8080/cart/';
  private changeProductQuantityInCartUrl = 'http://localhost:8080/cart';


  constructor(private http: HttpClient) {

  }

  public deleteCartEntryById(id: number) {
    return this.http.delete(this.removeFromCartProductUrl + id)
  }

  getCart(userId: string | null): Observable<Cart[]> {
    console.log(userId);
    return this.http.get<Cart[]>(this.getAllProductsUrl + userId).pipe(
      tap(data => console.log("All", JSON.stringify(data)))
    );
  }

  addProductToCart(product: IProduct | undefined, userId: string | null) {
    var newProduct = {
      productId: product!.id,
      quantity: 1
    }
    //fix so that the number '2' would be field of userId
      return this.http.post<CartModelToCart>(this.addToCartUrl + userId, newProduct).pipe(
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

  getTotalPrice(userId: string | null): Observable<number> {
    return this.http.get<number>(this.getTotalPriceUrl + userId);
  }


}
