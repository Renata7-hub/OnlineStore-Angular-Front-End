import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Products} from "../products";
import {productType} from "./productType";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  products: Products;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
              this.products = new class extends Products {};
  }

  productTypes: productType[] = [
    { id: "COMPUTER", title: "Computer" },
    { id: "MONITOR", title: "Monitor" },
    { id: "OTHER", title: "Other" }
  ];

  onSubmit() {
    console.log(this.productService.save(this.products).subscribe(result => this.gotoProductsList()));
  }

  gotoProductsList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
  }

}
