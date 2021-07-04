import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
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

  errorMessage = 'Invalid Credentials';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
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
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['/welcome']);

      } else {
        alert("Authentication failed.")
      }
    });
  }

}
