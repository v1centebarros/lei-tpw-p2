import { Component, Input, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  user!: any;
  loggedIn: boolean;
  typeAuthor: boolean;

  constructor(
    private router: Router, 
    private authenticationService: AuthService 
    ) {}

  ngOnInit(): void {
    console.log(this.authenticationService.loggedIn())
    this.loggedIn = this.authenticationService.loggedIn();
    this.user = this.authenticationService.getUserInfo();
    this.typeAuthor = this.user.type == "author";
    this.getImage()
  }

  logout() {
    console.log("logout")
    sessionStorage.clear();
    this.authenticationService.logout();
    this.loggedIn = this.authenticationService.loggedIn();
    window.location.href = '/login';
  }

  profile(){
    if (this.user.type == "user"){
      window.location.href = '/profile';
    }
    if (this.user.type == "author"){
      window.location.href = '/author/'+ this.user.id;
    }
  }
  getImage(){
    console.log("get image")
    let image = this.user.image
    if(image != null){
      this.user.image = "http://localhost:8000/" + this.user.image;
    }
    else
      this.user.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
}
