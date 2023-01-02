import { Component, OnInit } from '@angular/core';
import { BookService } from "../services/book.service";
import { User } from '../models/user.model';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  authors: User[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.bookService.getAllAuthors().subscribe(authors => this.authors = authors);
  }

}
