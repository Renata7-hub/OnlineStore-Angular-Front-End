import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";
import {Products} from "../products";
import {productType} from "./productType";

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  products: Products;
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  message: string | undefined;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
              this.products = new class extends Products {};
  }

  // public onFileChanged(event) {
  //   this.products.image = event.target.files[0];
  // }



  productTypes: productType[] = [
    { id: "COMPUTER", title: "Computer" },
    { id: "MONITOR", title: "Monitor" },
    { id: "OTHERS", title: "Others" }
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
