import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import { Book } from '../models/book.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getUser(id: Number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id + '/');
  }

  getBooksFromUser(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'users/' + id + '/get_user_books/');
  }

  getUserReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'users/' + id + '/get_user_reviews/');
  }

  getUserAvgRating(id: number): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'users/' + id + '/get_user_average_rating/');
  }

}
