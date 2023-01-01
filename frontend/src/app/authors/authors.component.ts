import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import {Author} from "../models/author.model";


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit{
  authors: Author[];

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

}
