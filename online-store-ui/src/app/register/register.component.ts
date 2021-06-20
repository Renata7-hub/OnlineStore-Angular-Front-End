import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RegisterInterface} from "./register.interface";


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterInterface) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
