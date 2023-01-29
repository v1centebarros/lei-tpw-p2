import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Session } from "../models/session.model";


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}
  
@Injectable({
providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:8000/api/';

    constructor(private httpClient: HttpClient) {
    }

    login(username: string, password: string): Observable<Session> {
        const uri = this.baseUrl + 'login';
        return this.httpClient.post<Session>(uri, {'username': username, 'password': password}, httpOptions);
    }

    register(user: any): Observable<Object> {
        console.log(user)
        const uri = this.baseUrl + 'user/register/';
        return this.httpClient.post(uri, user);
    }
}