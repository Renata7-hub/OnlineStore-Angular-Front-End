import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Storage} from "./storage";
import {IStorage} from "./storage.interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private getAllProductsInStorageUrl = 'http://localhost:8080/product/quantity'

  constructor(private http: HttpClient) { }

  public getProductsInStorage(): Observable<IStorage[]> {
    return this.http.get<IStorage[]>(this.getAllProductsInStorageUrl).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(StorageService.handleError)
    );
  }

  public getProductsInStorageById(id: number): Observable<IStorage | undefined> {
    return this.getProductsInStorage()
      .pipe(
        map((storages: IStorage[]) => storages.find(p => p.id === id))
      );
  }

  public getAllProductQuantityOnDate(date: Date){
    return this.http.get("http://localhost:8080/product/get-all/quantity?date="+date.toString()).pipe(
      tap(/*data => console.log("All", JSON.stringify(data))*/),
      catchError(StorageService.handleError)
    );
  }

  public getQuantityByProductIdOnDate(date: Date, id: number){
    return this.http.get("http://localhost:8080/product/{id}/quantity?date="+date+"&productId="+id).pipe(
      tap(/*data => console.log("All", JSON.stringify(data))*/),
      catchError(StorageService.handleError)
    );
  }

  public postProductQuantity(storage: Storage){
    return this.http.post("http://localhost:8080/product/quantity", storage).pipe(
      tap(/*data => console.log("All", JSON.stringify(data))*/),
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
