import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/author.model";


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'authors/');
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.baseUrl + 'authors/' + id + '/');
  }
}
