import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../models/author.model";


@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseUrl = 'https://marianaandrade.pythonanywhere.com/api/';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'authors/');
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.baseUrl + 'authors/' + id + '/');
  }

  getAuthorByRating(rating: number): Observable<Author[]> {
    let params = new HttpParams();
    params = params.append('rating', rating.toString());
    return this.http.get<Author[]>(this.baseUrl + 'authors/', {params: params});
  }

  updateAuthor(id:number, header: any): Observable<any> {
    const url = this.baseUrl + 'authors/' + id + '/';
    return this.http.put(url, header);
  }
}
