import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review.model";
import {Comment} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  getBookReviews(id: Number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'reviews/?book=' + id);
  }

  submitReview(id: number, userReview: string, user: number) {
    return this.http.post<Review>(this.baseUrl + 'reviews/', {book: id, text: userReview, user: user});

  }

  getReviewByUser(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'reviews/?user=' + id);
  }

  deleteReview(id: number) {
    return this.http.delete(this.baseUrl + 'reviews/' + id + '/');
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + 'comments/?review=' + id);
  }

  submitComment(id: number, userReply: string, user: number) {
    return this.http.post<Review>(this.baseUrl + 'comments/', {text: userReply, user: user, review: id});
  }

  deleteComment(id: number) {
    return this.http.delete(this.baseUrl + 'comments/' + id + '/');
  }


}
