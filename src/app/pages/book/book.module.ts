import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookRoutingModule} from "./book-routing.module";
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../../core/material/material.module";
import {BookService} from "../../core/services/book.service";
import { AddEditBookComponent } from './book-list/add-edit-book/add-edit-book.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BookListComponent,
    BookComponent,
    AddEditBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [BookService]
})
export class BookModule { }
