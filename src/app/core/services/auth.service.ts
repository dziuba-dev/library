import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {User} from "../models/user";
import {Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatusSubject = new Subject<string>();

  loginStatus$ = this.loginStatusSubject.asObservable();

  login(credentials: User): Observable<boolean> {
    if (credentials.email === 'admin@book.pl' && credentials.password === 'B0oK') {
      localStorage.setItem('currentUser', credentials.email);
      this.sendLoginStatus("Poprawnie zalogowany użytkownik!");
      return of(true);
    } else {
      return of(false);
    }
  }

  sendLoginStatus(successMessage: string) {
    this.loginStatusSubject.next(successMessage);
  }

  isLoggedIn(): Promise<boolean> {
    const loggedIn = !!localStorage.getItem('currentUser');
    return Promise.resolve(loggedIn);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
