import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../core/models/book";
import {AuthService} from "../../../core/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BookService} from "../../../core/services/book.service";
import {Subscription} from "rxjs";
import {AddEditBookComponent} from "./add-edit-book/add-edit-book.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";

@Component({
  selector: 'lib-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'author', 'category', 'isAvailable', 'actions'];
  dataSource = new MatTableDataSource<Book>();
  private subscriptions = new Subscription();

  constructor(
    private snackBar: MatSnackBar,
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getBooks() {
    this.subscriptions.add(
      this.bookService.getBooks().subscribe(
        (books: Book[]) => this.dataSource.data = books,
        error => this.snackBar.open('Błąd podczas ładowania książek.', 'Zamknij', { duration: 2000 })
      )
    );
  }

  addBook() {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '750px',
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBooks(); // Odświeżenie listy książek po dodaniu
      }
    }));
  }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(AddEditBookComponent, {
      width: '750px',
      data: book
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBooks(); // Odświeżenie listy książek po edycji
      }
    }));
  }

  deleteBook(bookId: string) {
    const sub = this.bookService.removeBook(bookId).subscribe(() => {
      this.getBooks(); // Odświeżenie listy książek po usunięciu
      this.snackBar.open('Książka usunięta', 'Zamknij', { duration: 2000 });
    }, error => this.snackBar.open('Błąd podczas usuwania książki.', 'Zamknij', { duration: 2000 }));

    this.subscriptions.add(sub);
  }
}
