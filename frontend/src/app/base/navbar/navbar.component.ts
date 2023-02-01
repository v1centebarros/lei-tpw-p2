import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  user!: any;
  loggedIn: boolean;
  typeAuthor: boolean;
  type: string;


  constructor(
    private router: Router, 
    private authenticationService: AuthService,
    private userService: UserService,
    private authorService: AuthorService

    ) {}

  ngOnInit(): void {
    console.log(this.authenticationService.loggedIn())
    this.loggedIn = this.authenticationService.loggedIn();
    this.user = this.authenticationService.getUserInfo();
    this.typeAuthor = this.user.type == "author";
    if(this.user.type=="user"){
      this.userService.getUser(this.user.id).subscribe((data: any) => {
        this.user = data;
      })
      this.type="user";
      
    }else{
      this.authorService.getAuthor(this.user.id).subscribe((data: any) => {
        this.user = data;
      })
      this.type="author";
    }
    
  }

  logout() {
    console.log("logout")
    sessionStorage.clear();
    this.authenticationService.logout();
    this.loggedIn = this.authenticationService.loggedIn();
    window.location.href = '/login';
  }

  profile(){
    if (this.type == "user"){
      window.location.href = '/profile';
    }
    if (this.type == "author"){
      window.location.href = '/author/'+ this.user.id;
    }
  }

  settings(){
    if (this.type == "user"){
      window.location.href = '/settings';
    }
    if (this.type == "author"){
      window.location.href = '/authorSettings';
    }
  }
}
