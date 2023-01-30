import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
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

  getAuthorByRating(rating: number): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('avg_rating__gte', rating.toString());
    return this.http.get<User[]>(this.baseUrl + 'users/', {params: params});
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

  // Adicionar um book ao favoritos
  addFavBook(id: number, book_id: number): Observable<Book[]>{
    return this.http.post<Book[]>(this.baseUrl + 'users/' + id + '/add_fav_book/' + book_id + '/', {});
  }

  // Adicionar um author ao favoritos
  addFavAuthor(id: number, author_id: number): Observable<Author[]>{
    return this.http.post<Author[]>(this.baseUrl + 'users/' + id + '/add_fav_author/' + author_id + '/', {});
  }

  // Adicionar um publisher ao favoritos
  addFavPublisher(id: number, publisher_id: number): Observable<Publisher[]>{
    return this.http.post<Publisher[]>(this.baseUrl + 'users/' + id + '/add_fav_publisher/' + publisher_id + '/', {});
  }

  // Remover um book dos favoritos
  removeFavBook(id: number, book_id: number): Observable<Book[]>{
    return this.http.delete<Book[]>(this.baseUrl + 'users/' + id + '/remove_fav_book/' + book_id + '/');
  }
  
  // Remover um author dos favoritos
  removeFavAuthor(id: number, author_id: number): Observable<Author[]>{
    return this.http.delete<Author[]>(this.baseUrl + 'users/' + id + '/remove_fav_author/' + author_id + '/');
  }

  // Remover um publisher dos favoritos
  removeFavPublisher(id: number, publisher_id: number): Observable<Publisher[]>{
    return this.http.delete<Publisher[]>(this.baseUrl + 'users/' + id + '/remove_fav_publisher/' + publisher_id + '/');
  }

  // edit user
  updateUser(id: number, header: any): Observable<any> {
    const url = this.baseUrl + 'users/' + id + '/';
    return this.http.put(url, header);
  }


}
