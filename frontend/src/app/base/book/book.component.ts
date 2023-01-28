import {Component, Input} from '@angular/core';
import {Book} from "../../models/book.model";
import {Author} from "../../models/author.model";
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  @Input()book : Book;
  author: Author = new Author();
  constructor(
    private authorService: AuthorService
  ) {}

  ngOnInit() {
    this.authorService.getAuthor(this.book.author).subscribe(
      (author) => {
        this.author = author;
      }
    );
  }
}
