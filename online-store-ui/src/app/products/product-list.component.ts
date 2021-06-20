import {Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Products} from "./products";
import {CartService} from "../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy{
  pageTitle = "Product list";
  showImage:boolean = true;
  errorMessage: string = "";
  private _listFilter: string = '';
  sub: Subscription | undefined;
  p: number = 1;

  get listFilter(): string {
    return this._listFilter;
}
  set listFilter(value: string){
    this._listFilter = value
    console.log('In setter: ',value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private _snackBar: MatSnackBar
  ) {
  }
  openSnackBarOnAdd() {
    this._snackBar.open('Product added to cart', 'Dismiss', {
      panelClass: ["custom-style"]
    });
  }

  openSnackBarOnDelete() {
    this._snackBar.open('Product removed from product list', 'Dismiss', {
      panelClass: ["custom-style"]
    });
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.title.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onDelete(id: number): void {
    this.openSnackBarOnDelete();
    this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    this.productService.deleteProductById(id)
      .subscribe({
        next: message => {
          message = "Delete succesfull"
        },
        error: err => this.errorMessage = err
      });
  }

  addToCartProduct(product: Products): void {
    this.openSnackBarOnAdd();
    this.cartService.addProductToCart(product).subscribe({
      next: message => {
      },
      error: err => this.errorMessage = err
    });

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    this.listFilter = "";
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
