import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLogged = new BehaviorSubject<boolean>(false);
  currentIsLogged = this.isLogged.asObservable();

  constructor() {
  }

  changeStatusOfLogin() {
    this.isLogged.next(!this.isLogged);
  }

}
