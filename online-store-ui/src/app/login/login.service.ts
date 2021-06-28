import { Injectable } from '@angular/core';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterInterface} from "../register/register.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registerNewUserUrl = "http://localhost:8080/register"

  private isLoggedSource = new BehaviorSubject(false);
  currentMessage = this.isLoggedSource.asObservable();

  constructor(private http: HttpClient) { }


  changeLoginToTrue() {
    this.isLoggedSource.next(true);
  }

  changeLoginToFalse() {
    this.isLoggedSource.next(false);
  }

  public register(newUser: RegisterInterface) {
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
