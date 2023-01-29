import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Session } from '../../models/session.model';
import {Search} from "../../models/search.model";


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
  query: string;
  avg_rating: number;
  year: string;
  publisher: string;
  language: string;




  onSearchChanged(search: Search): void {
    this.query = search.query;
    this.avg_rating = search.avg_rating;
    this.year = search.year;
    this.publisher = search.publisher;
    this.language = search.language;
  }


  constructor(public router: Router, public location: Location) {
    router.events.subscribe(
      () => {
        if (!this.loggedIn() && (location.path() !== '/login' && location.path() != '/register')) {
          // window.location.href = "/login";
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
