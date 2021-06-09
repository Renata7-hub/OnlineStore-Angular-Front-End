import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  food: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close({
      food: this.food
    });
  }

  ngOnInit(): void {
  }

}
