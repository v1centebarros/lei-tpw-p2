import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Search} from "../../models/search.model";
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit{
  query: string;
  avg_rating: number;
  year: string;
  publisher: string;
  language: string;
  genre: string;
  books: Book[];

  ngOnInit() {
    this.getBooks();
  }

  onSearchChanged(search: Search): void {
    this.query = search.query;
    this.avg_rating = search.avg_rating;
    this.year = search.year;
    this.publisher = search.publisher;
    this.language = search.language;
    this.getBooksWithFilters();
  }


  constructor(public router: Router, public location: Location, private bookService: BookService, private authenticationService: AuthService) {
    router.events.subscribe(
      () => {
        if (!this.loggedIn() && (location.path() !== '/login' && location.path() != '/register')) {
          router.navigate(['/login']);
        }
      }
    )
  }

  // Check if current user is logged in
  loggedIn() {
    return this.authenticationService.loggedIn();
  }

  // Get all books
  getBooks() {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  // Get books with search parameters
  getBooksWithFilters() {
    this.bookService.getBooksWithFilters({
      query: this.query,
      avg_rating: this.avg_rating,
      year: this.year,
      publisher: this.publisher,
      language: this.language
    }).subscribe(books => this.books = books);
  }
}
