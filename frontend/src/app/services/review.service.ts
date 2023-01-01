import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getBookReviews(id: Number): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'reviews/?book=' + id);
  }
}
