import { Component, OnInit } from '@angular/core';
import {LoginService} from "../login/login.service";
import {UserInterface} from "../login/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  pageTitle = 'Users';
  displayedColumns: string[] = ['userId', 'userName', 'password', 'first-name', 'last-name','age', 'email', 'role'];
  users: UserInterface[] = [];
  p: number = 1;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAllUsers().subscribe(data => this.users = data);
  }

}
