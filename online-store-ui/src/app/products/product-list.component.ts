import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import { Subscription } from "rxjs";
import {IProduct} from "./product";
import {ProductService} from "./product.service";
import {Products} from "./products";
import {CartService} from "../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {ProductEditingComponent} from "./product-editing.component";
import {MatDialog} from "@angular/material/dialog";


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


  displayedColumns: string[] = ['imageUrl', 'title', 'id', 'price', 'add','delete', 'update'];

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog
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

  openDialog(product: Products) {
    const dialogRef = this.dialog.open(ProductEditingComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
        this.updateRowData(result.data);
    });
  }

  updateRowData(row_obj: Products){
    this.productService.updateProduct(row_obj).subscribe({
      next: message => {
      },
      error: err => this.errorMessage = err
    });
    this.filteredProducts = this.filteredProducts.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.title = row_obj.title;
        value.price = row_obj.price;
        value.description = row_obj.description;
      }
      return true;
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

