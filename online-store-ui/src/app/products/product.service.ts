import {IProduct} from "./product";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Products} from "./products";
import {Cart} from "../cart/cart";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getProductUrl = "http://localhost:8080/product/get-all";
  private createProductUrl = "http://localhost:8080/product";
  private deleteProductUrl = "http://localhost:8080/product/delete/";
  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.getProductUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/api/v1/image-upload', formData);
  }

  public save(product: Products) {
    console.log(product)
    return this.http.post<Products>(this.createProductUrl, product).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  public getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.id === id))
      );
  }

  public deleteProductById(id: number) {
    return this.http.delete(this.deleteProductUrl + id)
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



}
