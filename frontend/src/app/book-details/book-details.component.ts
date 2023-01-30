import { Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BookService} from "../services/book.service";
import {Review} from "../models/review.model";
import {ReviewService} from "../services/review.service";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: Book;
  reviews: Review[];
  myReview: Review | null;
  showReviews: boolean = false;
  userReview: string = '';
  text_button: string = "Add Reviews";
  user: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private authenticationService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getUserInfo();
    this.getBook();
    this.getBookReviews();
    this.getReviewByUser();
  }

  getBook(): Book {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);

    return this.book;
  }

  getBookReviews(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getBookReviews(id)
      .subscribe(reviews => this.reviews = reviews);
  }

  getReviewByUser(): void {
    if (this.user !== null) {
      this.reviewService.getReviewByUser(this.user.id)
        .subscribe(review => this.myReview = review[0]);
    } else {
      this.myReview = null;
    }
  }

  showReviewsToggle(): void {
    if (this.showReviews) {
      this.text_button = "Add Reviews"
    } else {
      this.text_button = "Cancel Review"
    }
    this.showReviews = !this.showReviews;
  }

  submitReview(): void {
    if (this.user !== null) {
      const id = +Number(this.route.snapshot.paramMap.get('id'));
      this.reviewService.submitReview(id, this.userReview, this.user.id)
        .subscribe(() => this.getBookReviews());

      this.userReview = '';
    } else {
      alert("You must be logged in to submit a review");
    }
  }
}

