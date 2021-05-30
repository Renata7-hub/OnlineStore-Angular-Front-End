import {IProduct} from "./product";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = "http://localhost:8080/products/get-all"
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  private static handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }


  // getProducts(): IProduct[] {
  //   return [
  //     {
  //       "id": 1,
  //       "title": "Dell XP 56555",
  //       "description": "kompiuteris",
  //       "price": 866.99,
  //       "type": 1
  //
  //     },
  //     {
  //       "id": 2,
  //       "title": "Razer XP 69888",
  //       "description": "kompiuteris",
  //       "price": 966.66,
  //       "type": 1
  //     }
  //   ];
  // }

}
