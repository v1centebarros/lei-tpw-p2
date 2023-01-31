import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import {Book} from "../models/book.model";
import { User } from '../models/user.model';
import { Search } from '../models/search.model';
import { Rating } from '../models/rating.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8000/api/';
  private Book = new Book();
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/', httpOptions);
  }

  getBook(id: number): Observable<Book> {
    let infoBook = this.http.get<Book>(this.baseUrl + 'books/' + id + '/');
    infoBook.subscribe(
      (data) => {
        sessionStorage.setItem('book', JSON.stringify(data));
      }
    );
    return infoBook;
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

  getAuthorBooks(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/?author=' + id );
  }

  getAvailableYears(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'books/years/');
  }

  addBook(book: any): Observable<any> {
    return this.http.post(this.baseUrl + 'books/', book);
  }

  editBook(id: number, book: any): Observable<any> {
    return this.http.put(this.baseUrl + 'books/' + id + '/', book);
  }

  addRating(rating: Rating): Observable<any> {
    return this.http.post(this.baseUrl + 'books/add_rating/', rating);
  }
}
