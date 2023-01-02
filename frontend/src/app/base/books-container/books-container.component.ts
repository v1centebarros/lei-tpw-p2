import { Component, Input } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book.model";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent {
  @Input()user_id: number;
  books: Book[]

  constructor(
    private bookService: BookService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    console.log(this.user_id)
    if (this.user_id) {
      this.getBooksFromUser();
    } else {
      this.getBooks();
    }
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  getBooksFromUser(): void {
    this.UserService.getBooksFromUser(this.user_id).subscribe(books => this.books = books);
  }
}
