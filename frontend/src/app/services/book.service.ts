import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ConnectableObservable, Observable} from "rxjs";
import {Book} from "../models/book.model";
import { User } from '../models/user.model';
import { Search } from '../models/search.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/', httpOptions);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id + '/');
  }

  getAllAuthors(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'books/get_all_authors/');
  }

  getBooksWithFilters(search: Search): Observable<Book[]> {
    let params = new HttpParams();
    if (search.query) {
      params = params.append('title', search.query);
    }
    if (search.avg_rating) {
      params = params.append('rating', search.avg_rating.toString());
    }
    if (search.year) {
      params = params.append('year', search.year.toString());
    }
    if (search.publisher) {
      params = params.append('publisher', search.publisher);
    }
    if (search.language) {
      params = params.append('language', search.language);
    }
    return this.http.get<Book[]>(this.baseUrl + 'books/', {params: params});
  }

  getAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'books/years/');
  }

  addBook(book: any): Observable<any> {
    return this.http.post(this.baseUrl + 'books/', book);
  }

}
