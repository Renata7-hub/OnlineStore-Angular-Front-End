import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  model: any = {};
  loading: any;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  userName!: string;
  password!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '400px',
      data: { userName: this.userName,
              password: this.password,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              age: this.age
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.firstName = result;
    });
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
        this.loginService.changeLoginStatus();
        this.router.navigate(['/welcome']);

      } else {
        alert("Authentication failed.")
      }
    });
  }
}
