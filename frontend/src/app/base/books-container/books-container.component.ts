import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book.model";
import {UserService} from "../../services/user.service";
import {Search} from "../../models/search.model";

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnChanges{
  @Input()user_id: number;
  @Input()query: string;
  @Input()avg_rating: number;
  @Input()year: number;
  @Input()publisher: string;
  @Input()language: string;
  previousSearch: any;
  books: Book[]

  constructor(
    private bookService: BookService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    if (this.user_id) {
      this.getBooksFromUser();
    } else {
      this.getBooks();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user_id) {
      this.getBooksFromUser();
      return;
    }

    const search: Search = {
      query: this.query,
      avg_rating: this.avg_rating,
      year: this.year,
      publisher: this.publisher,
      language: this.language
    } 
    this.bookService.getBooksWithFilters(search).subscribe(books => this.books = books);
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  getBooksFromUser(): void {
    this.UserService.getBooksFromUser(this.user_id).subscribe(books => this.books = books);
  }
  
}
