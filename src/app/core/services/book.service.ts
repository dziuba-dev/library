import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; // URL do API

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  editBook(book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${book.id}`, book);
  }

  removeBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
