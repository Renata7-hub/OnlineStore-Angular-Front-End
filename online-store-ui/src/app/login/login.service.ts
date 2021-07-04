import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterInterface} from "../register/register.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registerNewUserUrl = "http://localhost:8080/register-user";
  private registerNewAdminUrl = "http://localhost:8080/register-admin";
  private getLoggedPersonInRoleUrl = "http://localhost:8080/get-role/";

  private isLoggedSource = new BehaviorSubject('false');
  currentLoggedStatus = this.isLoggedSource.asObservable();

  constructor(private http: HttpClient) {
  }

  changeLoginStatusToTrue() {
    this.isLoggedSource.next('true');
    sessionStorage.removeItem('isLogged')
    sessionStorage.setItem('isLogged', 'true');
  }

  changeLoginStatusToFalse() {
    this.isLoggedSource.next('false');
    sessionStorage.removeItem('isLogged')
    sessionStorage.removeItem('role')
    sessionStorage.setItem('isLogged', 'false');
  }

  public getRole(userName: any): Observable<RegisterInterface> {
    sessionStorage.removeItem('role')
    return this.http.get<RegisterInterface>(this.getLoggedPersonInRoleUrl + userName)
  }

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
