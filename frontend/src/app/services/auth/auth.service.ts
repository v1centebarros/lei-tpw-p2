import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://127.0.0.1:8000/api/';
    private baseUrlImage ='http://127.0.0.1:8000/api/user/image/';

    constructor(private http: HttpClient) { }

    authenticate(header: any): Observable<any> {
        const url = this.baseUrl + 'login/';
        return this.http.post(url, header);
    }
    
    registerUser(header: any): Observable<any> {
        const url = this.baseUrl + 'user/register/';
        return this.http.post(url, header);
    }

    registerAuthor(header: any): Observable<any> {
        const url = this.baseUrl + 'author/register/';
        return this.http.post(url, header);
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    setToken(token:any){
        localStorage.setItem('token',token);
    }

    logout(){
        localStorage.removeItem('token');
    }

}
