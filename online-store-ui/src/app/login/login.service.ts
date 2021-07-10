import { Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {RegisterInterface} from "../register/register.interface";
import {UserInterface} from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registerNewUserUrl = "http://localhost:8080/register-user";
  private registerNewAdminUrl = "http://localhost:8080/register-admin";
  private getLoggedPersonInRoleUrl = "http://localhost:8080/find-all-users";

  private isLoggedSource = new BehaviorSubject('false');
  currentLoggedStatus = this.isLoggedSource.asObservable();

  private currentUser = new BehaviorSubject('');
  currentUserStatus = this.currentUser.asObservable();

  private currentUserName = new BehaviorSubject('');
  currentUserNameStatus = this.currentUserName.asObservable();

  constructor(private http: HttpClient) {
  }

  changeToCurrentUserRole(role: string, userName: string) {
    this.currentUserName.next(userName);
    this.currentUser.next(role);
  }

  changeLoginStatusToTrue() {
    this.isLoggedSource.next('true');
    sessionStorage.removeItem('isLogged')
    sessionStorage.setItem('isLogged', 'true');
  }

  changeLoginStatusToFalse() {
    this.isLoggedSource.next('false');
    this.currentUser.next("GUEST")
    sessionStorage.removeItem('isLogged')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('user_id')
    sessionStorage.setItem('isLogged', 'false');
  }

  public getRole(): Observable<UserInterface[]> {
    sessionStorage.removeItem('role')
    return this.http.get<UserInterface[]>(this.getLoggedPersonInRoleUrl)
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
