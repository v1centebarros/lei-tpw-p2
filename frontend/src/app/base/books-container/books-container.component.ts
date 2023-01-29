import { Component, Input } from '@angular/core';
import {Book} from "../../models/book.model";

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent{
  @Input()books: Book[]

  constructor(
  ) { }

}
