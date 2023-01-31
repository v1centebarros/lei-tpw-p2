import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://marianaandrade.pythonanywhere.com/api/';
    private baseUrlImage ='https://marianaandrade.pythonanywhere.com/api/user/image/';

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



    getUserInfo(){
        let type = sessionStorage.getItem("type")

        if (type == 'user') {
            return{
                id: sessionStorage.getItem("id"),
                username: sessionStorage.getItem("username"),
                email: sessionStorage.getItem("email"),
                first_name: sessionStorage.getItem("first_name"),
                last_name: sessionStorage.getItem("last_name"),
                type: sessionStorage.getItem("type"),
                token: sessionStorage.getItem("token"),
                description: sessionStorage.getItem("description"),
                birth_date: sessionStorage.getItem("birth_date"),
                image: sessionStorage.getItem("image"),
            }
        } else {
            return {
                id: sessionStorage.getItem("id"),
                email: sessionStorage.getItem("email"),
                name: sessionStorage.getItem("name"),
                nationality: sessionStorage.getItem("nationality"),
                type: sessionStorage.getItem("type"),
                token: sessionStorage.getItem("token"),
                description: sessionStorage.getItem("description"),
                birth_date: sessionStorage.getItem("birth_date"),
                image: sessionStorage.getItem("image")
            }
        }
    }
}
