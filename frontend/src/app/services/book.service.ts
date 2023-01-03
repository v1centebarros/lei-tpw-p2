import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/');
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + 'books/' + id + '/');
  }

  getAllAuthors(): Observable<any> {
    return this.http.get(this.baseUrl + 'books/get_all_authors/');
  }

  getBooksWithFilters(avg_rating: number, year: number, publisher: string, language: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/?avg_rating__gte=' + avg_rating + '&publish_date_year=' + year + '&publisher=' + publisher + '&language=' + language);
  }
}
