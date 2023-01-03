import { Component } from '@angular/core';
import { Session } from '../../models/session.model';
import {Router} from "@angular/router";
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    session!: Session | null;
    userProfile!: User;

    constructor(private router: Router,private usersService: UserService) {
        this.session = Session.getCurrentSession();
        this.userProfile = User.getNullUser();
    }

    ngOnInit(): void {
        if (this.session === null) return;

        let user_id = this.session?._user_id;
        //console.log(user_id)

        this.usersService.getUser(user_id).subscribe(
            (user: User) => {
                this.userProfile = user;
            }
        );

    }

  // Check if current user is logged in
  loggedIn() {
    return (Session.getCurrentSession() !== null);
  }


  logout() {
    localStorage.removeItem('user');
  }
}
