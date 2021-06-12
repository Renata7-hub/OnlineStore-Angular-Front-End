import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading: any;
  isLogged: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.currentIsLogged.subscribe(isLogged =>
      this.isLogged = isLogged)
    sessionStorage.setItem('token', '');
  }

  onChange(): void {
    this.loginService.changeStatusOfLogin();
  }

  login() {
    let url = 'http://localhost:8080/login';
    this.http.post<Observable<boolean>>(url, {
      userName: this.model.username,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['/welcome']);

      } else {
        alert("Authentication failed.")
      }
    });
  }
}
