import { Component, OnInit } from '@angular/core';
import { BookService } from "../services/book.service";
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  authors: User[];
  rating: number;

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.userService.getAuthorByRating(1).subscribe(authors => this.authors = authors);
  }

  onRatingChange(): void {
    this.userService.getAuthorByRating(this.rating).subscribe(authors => this.authors = authors);
  }

}
