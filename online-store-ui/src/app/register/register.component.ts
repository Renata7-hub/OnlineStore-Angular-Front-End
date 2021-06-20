import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RegisterInterface} from "./register.interface";
import {LoginService} from "../login/login.service";


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  nothing: any;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterInterface,
    private loginService: LoginService) {}

  onNoClick(newUser: RegisterInterface): void {
    this.loginService.register(newUser).subscribe(result => this.nothing);
    this.dialogRef.close();
  }

}
