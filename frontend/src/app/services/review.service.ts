import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review.model";

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
}
