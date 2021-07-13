import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Storage} from "./storage";
import {IStorage} from "./storage.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private getQuantityByDateUrl = "http://localhost:8080/product/get-all/quantity";
  private getQuantityByIdAndDateUrl = "http://localhost:8080/product/{id}/quantity";
  private postProductQuantityUrl = "http://localhost:8080/product/quantity";
  private getProductQuantityUrl = "http://localhost:8080/product/quantity";

  constructor(private http: HttpClient) { }

  public getAllProductQuantityOnDate(date: Date){
    return this.http.get(this.getQuantityByDateUrl + "?date="+date.toString())
  }

  public getAllProductQuantity(): Observable<IStorage[]> {
    return this.http.get<IStorage[]>(this.getProductQuantityUrl);
  }

  public getQuantityByProductIdOnDate(date: Date, id: number){
    return this.http.get(this.getQuantityByIdAndDateUrl + "?date="+date+"&productId="+id).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(StorageService.handleError)
    );
  }

  public postProductQuantity(storage: Storage){
    return this.http.post(this.postProductQuantityUrl, storage).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(StorageService.handleError)
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
}
