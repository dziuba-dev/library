import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {Observable, of, Subject} from "rxjs";

@Injectable()
export class BookService {
  private booksSubject = new Subject<boolean>();

  booksSubject$ = this.booksSubject.asObservable();

  books: Book[] = [];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  addBook(book: Book) {
    this.books.push(book);
    this.booksSubject.next(true);
  }

  editBook(book: Book) {
    this.books.forEach(item => {
      if (item.id === book.id) {
        item.name = book.name;
        item.author = book.author;
        item.category = book.category;
        item.isAvailable = book.isAvailable
      }
    });
  }

  removeBook(id: string) {
    this.books = this.books.filter(item => item.id !== id);
  }
}
