import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Publisher} from "../models/publisher.model";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private baseUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.baseUrl + 'publishers');
  }

}
