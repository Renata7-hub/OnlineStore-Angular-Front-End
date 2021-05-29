import {IProduct} from "./product";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = "localhost:8080/products"
  constructor(private http: HttpClient) {
  }

  // getProducts(): Observable<IProduct[]> {
  //   return this.http.get<IProduct[]>(this.productUrl);
  // }

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
