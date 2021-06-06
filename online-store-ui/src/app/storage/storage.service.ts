import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  public getAllProductQuantityOnDate(date: Date){
    return this.http.get("http://localhost:8080/product/get-all/quantity?date="+date.toString()).pipe(
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
