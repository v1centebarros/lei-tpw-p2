import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import { User } from '../models/user.model';
import { Year } from '../models/year.model';
import { Language } from '../models/language.model';
import { Search } from '../models/search.model';


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

  getAllAuthors(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'books/get_all_authors/');
  }

  getBooksWithFilters(search: Search): Observable<Book[]> {
    let params = new HttpParams();
    if (search.query) {
      params = params.append('name__icontains', search.query);
    }
    if (search.avg_rating) {
      params = params.append('avg_rating__gte', search.avg_rating.toString());
    }
    if (search.year) {
      params = params.append('publish_date_year', search.year.toString());
    }
    if (search.publisher) {
      params = params.append('publisher', search.publisher);
    }
    if (search.language) {
      params = params.append('language', search.language);
    }
    return this.http.get<Book[]>(this.baseUrl + 'books/', {params: params});
  }

  getAvailableLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.baseUrl + 'books/get_available_languages/');
  }

  getAvailableYears(): Observable<Year[]> {
    return this.http.get<Year[]>(this.baseUrl + 'books/get_available_years/');
  }

  addBook(name: String, Pages: Number, publish_date: String, Language: String, Author: Number, Publisher: String, Isbn: Number, Description: String): Observable<Book> {

    return this.http.post<Book>(this.baseUrl + 'books/', {
      name: name,
      pages: Pages,
      publish_date: publish_date,
      language: Language,
      author: Author,
      publisher: Publisher,
      isbn: Isbn,
      description: Description
    }, httpOptions);

  }

}
