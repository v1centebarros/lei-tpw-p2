import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const paramsToMap = new Map();
    if (search.query) {
      paramsToMap.set('query', search.query);
      paramsToMap.set('avg_rating__gte', search.avg_rating);
      paramsToMap.set('publish_date_year', search.year);
      paramsToMap.set('publisher', search.publisher);
      paramsToMap.set('language', search.language);
    }
    return this.http.get<Book[]>(this.baseUrl + 'books/', {params: Object.fromEntries(paramsToMap)});
  }

  getAvailableLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.baseUrl + 'books/get_available_languages/');
  }

  getAvailableYears(): Observable<Year[]> {
    return this.http.get<Year[]>(this.baseUrl + 'books/get_available_years/');
  }

}
