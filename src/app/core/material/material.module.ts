import { NgModule } from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";

const MATERIALS = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTableModule,
  MatDialogModule,
  MatCheckboxModule
]

@NgModule({
  declarations: [],
  exports: [...MATERIALS]
})
export class MaterialModule { }
