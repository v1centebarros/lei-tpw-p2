import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Review } from '../models/review.model';
import { Publisher } from '../models/publisher.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  getUser(id: Number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id + '/');
  }


  getUserReviews(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'users/' + id + '/get_user_reviews/');
  }

  getUserFavBook(id: number): Observable<Book[]>{
    return this.http.get<Book[]>(this.baseUrl + 'users/' + id + '/get_fav_book/');
  }

  getUserFavAuthor(id: number): Observable<Author[]>{
    return this.http.get<Author[]>(this.baseUrl + 'users/' + id + '/get_fav_author/');  
  }

  getUserFavPublisher(id: number): Observable<Publisher[]>{
    return this.http.get<Publisher[]>(this.baseUrl + 'users/' + id + '/get_fav_publisher/');
  }

  getAuthorByRating(rating: number): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('avg_rating__gte', rating.toString());
    return this.http.get<User[]>(this.baseUrl + 'users/', {params: params});
  }

}
