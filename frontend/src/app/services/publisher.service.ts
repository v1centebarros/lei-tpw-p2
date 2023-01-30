import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publisher} from "../models/publisher.model";
import {Book} from "../models/book.model";
import {Author} from "../models/author.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.baseUrl + 'publishers/', httpOptions);
  }

  getPublisher(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(this.baseUrl + 'publishers/' + id + '/', httpOptions);
  }

  createPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.baseUrl + 'publishers/', publisher, httpOptions);
  }

  updatePublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.put<Publisher>(this.baseUrl + 'publishers/' + publisher.id + '/', publisher, httpOptions);
  }

  deletePublisher(id: number): Observable<Publisher> {
    return this.http.delete<Publisher>(this.baseUrl + 'publishers/' + id + '/', httpOptions);
  }

  getPublisherBooks(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'publishers/' + id + '/get_publisher_books/', httpOptions);
  }

  getPublisherAuthors(id: number): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + 'publishers/' + id + '/get_publisher_authors/', httpOptions);
  }

}
