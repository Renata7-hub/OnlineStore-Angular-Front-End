import {IProduct} from "./product";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): IProduct[] {
    return [
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
  }

}
