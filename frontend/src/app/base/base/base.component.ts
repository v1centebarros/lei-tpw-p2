import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Session } from '../../models/session.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {


  constructor(public router: Router, public location: Location) {
    router.events.subscribe(
      () => {
        if (!this.loggedIn() && (location.path() !== '/login' && location.path() != '/register')) {
          window.location.href = "/login";
          router.navigate(['/login']);
        }
      }
    )
  }

  
  // Check if current user is logged in
  loggedIn() {
    return (Session.getCurrentSession() !== null);
  }
}
