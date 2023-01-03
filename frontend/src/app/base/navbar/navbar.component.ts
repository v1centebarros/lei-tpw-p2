import { Component } from '@angular/core';
import { Session } from '../../models/session.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    session!: Session | null;

    constructor(private router: Router) {
        this.session = Session.getCurrentSession();
    }

    ngOnInit(): void {
        if (this.session === null) return;

        //user dados

    }


  logout() {
    localStorage.removeItem('user');
  }
}
