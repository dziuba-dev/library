import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../core/models/book";
import {AuthService} from "../../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookService} from "../../../core/services/book.service";
import {Subscription} from "rxjs";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {MatDialog} from "@angular/material/dialog";
import * as _ from 'lodash';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'lib-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'author', 'category', 'isAvailable', 'actions'];
  dataSource = new MatTableDataSource<Book>();

  subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _bookService: BookService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._authService.loginStatus$.subscribe(item => this._snackBar.open(item, "OK"));
    this.getBooks();
    this._bookService.booksSubject$.subscribe(item => {
      if (item) {
        this.getBooks();
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getBooks() {
    this.subscription = this._bookService.getBooks().subscribe(
      (book: Book[]) => {
        _.cloneDeep(this.dataSource);
        this.dataSource.data = book;
      }
    )
  }

  editBook(book: Book) {
    const dialogRef = this._dialog.open(AddEditBookComponent, {
      width: '750px',
      data: book
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });

  }

  deleteBook(bookId: string) {
    this._bookService.removeBook(bookId);
    this.getBooks();
  }
}
