import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ComponentsModule} from "../../core/components/components.module";
import {MaterialModule} from "../../core/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreService} from "../../core/services/core.service";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [CoreService]
})
export class AuthModule { }
