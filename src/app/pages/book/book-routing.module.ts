import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BookListComponent} from "./book-list/book-list.component";
import {BookComponent} from "./book.component";

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: 'list',
        component: BookListComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
