import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedSource = new BehaviorSubject(false);
  currentMessage = this.isLoggedSource.asObservable();

  constructor() { }

  changeLoginStatus() {
    this.isLoggedSource.next(true);
  }


}
