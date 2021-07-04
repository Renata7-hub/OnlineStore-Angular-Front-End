import {EventEmitter, Injectable, Input, Output} from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterInterface} from "../register/register.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registerNewUserUrl = "http://localhost:8080/register-user";
  private registerNewAdminUrl = "http://localhost:8080/register-admin"

  constructor(private http: HttpClient) { }

  public registerUser(newUser: RegisterInterface) {
    console.log(newUser)
    return this.http.post<RegisterInterface>(this.registerNewUserUrl, newUser).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(LoginService.handleError)
    );
  }

  public registerAdmin(newUser: RegisterInterface) {
    console.log(newUser)
    return this.http.post<RegisterInterface>(this.registerNewUserUrl, newUser).pipe(
      tap(data => console.log("All", JSON.stringify(data))),
      catchError(LoginService.handleError)
    );
  }
  private static handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error mesage is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage)
  }
}
