import { Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BookService} from "../services/book.service";
import {Review} from "../models/review.model";
import {ReviewService} from "../services/review.service";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {UserService} from "../services/user.service";
import { Comment } from '../models/comment.model';

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
  text_fav: string = "Add Fav";
  state_fav: boolean = false;
  user: any;
  userComment: string[] = [];
  comments: Comment[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private authenticationService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user = this.authenticationService.getUserInfo();
    this.getBook();
    this.getBookReviews();
    this.getReviewByUser();
    this.verifyFav();
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
      .subscribe(reviews => {
        this.reviews = reviews;
        for (let i = 0; i < this.reviews.length; i++) {
          this.userComment[i] = '';
        }
      });
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

  addFav(): void {
    if (this.user !== null && this.user.type == "user") {
      if (this.state_fav) {
        this.text_fav = "Add Fav";
        this.userService.removeFavBook(this.user.id, this.book.id)
          .subscribe(() => this.state_fav = false);
      } else {
        this.text_fav = "Remove Fav";
        this.userService.addFavBook(this.user.id, this.book.id)
          .subscribe(() => this.state_fav = true);
      }
    } else {
      alert("You must be logged in to add a favorite");
    }
  }

  verifyFav(): void {
    if (this.user !== null) {
      this.userService.getUserFavBook(this.user.id)
        .subscribe(books => {
          for (let book of books) {
            if (book.id === this.book.id) {
              this.state_fav = true;
              this.text_fav = "Remove Fav";
            }
          }
        });
    }
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

  getComments(review: number): void {
    console.log("getComments")
    this.reviewService.getComments(review)
      .subscribe(comments => this.comments = comments);
  }

  submitComment(review: number, index: number): void {
    if (this.user !== null) {
      this.reviewService.submitComment(review, this.userComment[index], this.user.id)
        .subscribe(() => this.getBookReviews());

      this.userComment[index] = '';
    } else {
      alert("You must be logged in to submit a comment");
    }
  }

  calculateDate(date: string): string {
    let currentDate = new Date();
    let reviewDate = new Date(date);
    let difference = currentDate.getTime() - reviewDate.getTime();
    let days = Math.floor(difference / (1000 * 3600 * 24));
    let hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
    let minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  }
    
    
}

