import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginService} from "./login.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";
import {UserInterface} from "./user.interface";


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
  role!: string;
  users: UserInterface[] = [];


  errorMessage = 'Invalid Credentials';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog,
    private loginService: LoginService
  ) { }


  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.loginService.getRole().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => this.errorMessage = err
    });
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
  }


  login() {
    let url = 'http://localhost:8080/login';
    let loginUser = {
      userName: this.model.userName,
      password: this.model.password
    }
    const headers = new HttpHeaders({Authorization: "Basic" + btoa(this.model.username + ':' + this.model.password)})
    this.http.post(url, loginUser).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.userName + ':' + this.model.password)
        );
        this.getRoleAfterLogin(this.model.userName);
        this.loginService.changeLoginStatusToTrue();
        this.router.navigate(['/welcome']);

      } else {
        alert("Authentication failed.")
      }
    });
  }

    getRoleAfterLogin(userName: string): void {
      this.users.map(users => {
        if (users.userName == userName) {
          if (users.role == 'ADMIN') {
            sessionStorage.setItem('role', 'ADMIN');
            return;
          } else {
            sessionStorage.setItem('role', 'USER');
            return;
          }
        }
      });
  }
}
