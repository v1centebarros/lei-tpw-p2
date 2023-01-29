import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  userProfile!: User;
  loggedIn: boolean;

  constructor(
    private router: Router, 
    private authenticationService: AuthService 
    ) {}

  ngOnInit(): void {
    console.log(this.authenticationService.loggedIn())
    this.loggedIn = this.authenticationService.loggedIn();
  }

  logout() {
    console.log("logout")
    sessionStorage.clear();
    this.authenticationService.logout();
    this.loggedIn = this.authenticationService.loggedIn();
    this.router.navigate(['/login']);
  }
}
