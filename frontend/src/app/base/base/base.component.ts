import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Session } from '../../models/session.model';
import {Search} from "../../models/search.model";
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';


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
    this.genre = search.genre;
    this.getBooksWithFilters();
  }


  constructor(public router: Router, public location: Location, private bookService: BookService) {
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
      language: this.language,
      genre: this.genre
    }).subscribe(books => this.books = books);
  }   
}
