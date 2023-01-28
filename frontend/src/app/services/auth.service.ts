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

    register(email: string, username: string, password: string, firstName:string, lastName:string, description:string, birth_date:string
        ): Observable<Object> {
        const uri = this.baseUrl + 'user/register';
        return this.httpClient.post(uri, {'email': email, 'username': username, 'password': password , "first_name":firstName, "last_name": lastName, "description":description, "birth_date":birth_date}, httpOptions);
    }
}