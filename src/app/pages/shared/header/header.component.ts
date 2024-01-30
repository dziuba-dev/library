import {Component} from '@angular/core';
import {AddEditBookComponent} from "../../book/book-list/add-edit-book/add-edit-book.component";
import {MatDialog} from "@angular/material/dialog";
import {BookService} from "../../../core/services/book.service";

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userName: string = localStorage.getItem('currentUser') ?? '';

  constructor(
    private dialog: MatDialog,
    private _boolService: BookService) {}

  openAddBookDialog() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this._boolService.getBooks().subscribe();
    });
  }
}
