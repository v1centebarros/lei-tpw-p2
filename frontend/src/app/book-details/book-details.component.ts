import { Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BookService} from "../services/book.service";
import {Review} from "../models/review.model";
import {ReviewService} from "../services/review.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

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
  session!: Session | null;
  userProfile!: User;
  text_button: string = "Add Reviews";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
    private reviewService: ReviewService,
    private usersService: UserService,
  ) {
    this.session = Session.getCurrentSession();
    this.userProfile = User.getNullUser();
  }

  ngOnInit() {
    this.getBook()
    this.getBookReviews();
    this.getReviewByUser();

    if (this.session === null) return;
    let user_id = this.session?._user_id;
        //console.log(user_id)

        this.usersService.getUser(user_id).subscribe(
            (user: User) => {
                this.userProfile = user;
            }
        );
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
    this.reviewService.getReviewByUser(1)
      .subscribe(review => this.myReview = review[0]);
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
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.submitReview(id, this.userReview, 1)
      .subscribe(() => this.getBookReviews());

    this.userReview = '';
  }
}

