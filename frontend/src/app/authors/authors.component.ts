import { Component, OnInit } from '@angular/core';
import { BookService } from "../services/book.service";
import { Author } from "../models/author.model";
import { AuthorService } from "../services/author.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  authors: Author[];
  rating: number;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthorByRating(0).subscribe(authors => this.authors = authors);
  }

  onRatingChange(): void {
    this.authorService.getAuthorByRating(this.rating).subscribe(authors => this.authors = authors);
  }

}
