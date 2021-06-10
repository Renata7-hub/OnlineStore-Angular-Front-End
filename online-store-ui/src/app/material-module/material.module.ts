import { NgModule } from '@angular/core';

import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule } from "@angular/material";
import { FormsModule } from '@angular/forms';
import { MyModalComponent } from './my-modal/my-modal.component';

@NgModule({
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  declarations: [
    MyModalComponent
  ]
})
export class MaterialModule {}
