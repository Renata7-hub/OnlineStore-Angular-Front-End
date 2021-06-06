import { Component, OnInit } from '@angular/core';
import {ProductService} from "../products/product.service";
import {IProduct} from "../products/product";
import {DatePipe} from "@angular/common";
import {StorageService} from "./storage.service";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  providers: [DatePipe]
})
export class StorageComponent implements OnInit {
  pageTitle = "Product quantities"
  errorMessage: string = "";
  products!: IProduct[];
  storages: any;
  date = new Date();

  constructor(private productService: ProductService,
              private storageService: StorageService,
              private datePipe: DatePipe) {
    // @ts-ignore
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });
    console.log(this.date)

    this.storageService.getAllProductQuantityOnDate(this.date).subscribe(data => {
      this.storages = data;
      console.log(this.storages)
    })

  }

  substract(product_id: number){

  }

  add(product_id: number){

  }

}
