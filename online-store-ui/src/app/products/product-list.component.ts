import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
  pageTitle = "Produktų sąrašas";
  showImage:boolean = true;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
}
  set listFilter(value: string){
    this._listFilter = value
    console.log('In setter: ',value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [
    {
    "productId": 1,
      "productName": "Dell XP 56555",
      "productPrice": 866.99,
      "productAmount": 10,
      "imageUrl": "assets/images/unnamed.png"
    },
    {
      "productId": 2,
      "productName": "Razer XP 69888",
      "productPrice": 966.66,
      "productAmount": 18,
      "imageUrl": "assets/images/unnamed.png"
    }
  ];

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.listFilter = "";
  }
}
