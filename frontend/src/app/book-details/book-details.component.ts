import { Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BookService} from "../services/book.service";
import {Review} from "../models/review.model";
import {ReviewService} from "../services/review.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: Book;
  reviews: Review[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.getBook();
    this.getBookReviews();
  }

  getBook(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  getBookReviews(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getBookReviews(id)
      .subscribe(book => this.reviews = book);
  }
}

