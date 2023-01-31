import { Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BookService} from "../services/book.service";
import {Review} from "../models/review.model";
import {ReviewService} from "../services/review.service";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import {UserService} from "../services/user.service";
import { Comment } from '../models/comment.model';
import { Rating } from '../models/rating.model';
import { SafeUrl } from '@angular/platform-browser';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  book: Book = new Book();
  reviews: Review[];
  myReview: Review | null;
  showReviews: boolean = false;
  userReview: string = '';
  text_button: string = "Add Reviews";
  text_fav: string = "Add Fav";
  state_fav: boolean = false;
  user: any;
  userComment: string[] = [];
  comments: Comment[][] = [];
  rating: Rating = new Rating();
  editMyReview: boolean = false;
  showRateBook: boolean = false;
  selectedRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService,
    private authenticationService: AuthService,
    private userService: UserService
  ) {
  }

  download(){
    this.getdoc();
  }
  getdoc(){
    const { jsPDF } = require("jspdf");
    let doc = new jsPDF({
    });

    // Set font and font size
    doc.setFont("times");
    doc.setFontSize(16);

    // Set text color
    doc.setTextColor(0, 0, 0);

    // Generate a PDF with all the information about the book
    doc.text("Title: " + this.book.title, 10, 20);

    // Set font size for author
    doc.setFontSize(14);
    doc.text("Author: " + this.book.author_name, 10, 40);

    // Set font size for publisher
    doc.setFontSize(14);
    doc.text("Publisher: " + this.book.publisher_name, 10, 60);

    // Set font size for ISBN
    doc.setFontSize(14);
    doc.text("ISBN: " + this.book.isbn, 10, 80);

    // Set font size for Publish date
    doc.setFontSize(14);
    doc.text("Publish_date: " + this.book.publish_date, 10, 100);

    // Set font size for Description
    doc.setFontSize(14);
    doc.text("Description: " + this.book.description, 10, 120);

    // Set font size for Language
    doc.setFontSize(14);
    doc.text("Language: " + this.book.language, 10, 140);

    // Set font size for Pages
    doc.setFontSize(14);
    doc.text("Pages: " + this.book.pages, 10, 160);

    // Set font size for Average Rating
    doc.setFontSize(14);
    doc.text("Average Rating: " + this.book.avg_rating, 10, 180);

    // Set font size for Number of Ratings
    doc.setFontSize(14);
    doc.text("Number of Ratings: " + this.book.num_ratings, 10, 200);

    // Set font size for Genre
    doc.setFontSize(14);
    doc.text("Genre: " + this.book.genre_name, 10, 220);

    // set imagem from the book

    doc.addImage(this.book.image, 'JPEG', 10, 230, 50, 50);


    // Save the PDF
    doc.save(this.book.title +".pdf");

  }

  ngOnInit() {
    this.user = this.authenticationService.getUserInfo();
    this.getBook();
    this.getBookReviews();
    this.getReviewByUserAndBook();
    this.verifyFav();
    this.getRatingbyBookAndUser();
  }

  getBook(): Book {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);

    return this.book;
  }

  deleteBook(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.deleteBook(id)
      .subscribe(() => {
        window.location.href = '/books';
      });
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

  showRateToggle(): void {
    this.showRateBook = !this.showRateBook;
  }

  getRatingbyBookAndUser(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getRatingByBookAndUser(id, this.user.id)
      .subscribe(rating => {
        this.rating = rating[0]
        this.selectedRating = this.rating.rating;
      });
  }

  addRating(): void {
    const newRating = new Rating();
    newRating.rating = this.selectedRating;
    newRating.book = this.book.id;
    newRating.user = this.user.id;
    if (this.user !== null) {
      this.bookService.addRating(newRating)
        .subscribe(() => {
          this.getRatingbyBookAndUser();
          this.getBook();
        });
    } else {
      alert("You must be logged in to rate a book");
    }
  }

  changeRating(): void {
    const newRating = new Rating();
    newRating.id = this.rating.id;
    newRating.rating = this.selectedRating;
    newRating.book = this.book.id;
    newRating.user = this.user.id;
    if (this.user !== null) {
      this.bookService.changeRating(newRating)
        .subscribe(() => {
          this.getBook();
        });
    } else {
      alert("You must be logged in to rate a book");
    }
  }

  getReviewByUserAndBook(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviewByUserAndBook(this.user.id, id)
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
      this.reviewService.submitReview(this.book.id, this.userReview, this.user.id)
        .subscribe(() => {
          this.getBookReviews();
          this.getReviewByUserAndBook();
        });

      this.userReview = '';
    } else {
      alert("You must be logged in to submit a review");
    }
  }

  deleteReview(review: number): void {
    this.reviewService.deleteReview(review)
      .subscribe(() => this.getBookReviews());
  }

  showEditReview(): void {
    this.editMyReview = !this.editMyReview;
  }

  editReview(text: string): void {
    if (this.myReview !== null) {
      this.myReview.text = text;
      this.reviewService.editReview(this.myReview)
        .subscribe(() => this.getBookReviews());
    }
  }

  getComments(review: number, index: number): void {
    console.log("getComments")
    this.reviewService.getComments(review)
      .subscribe(comments => this.comments[index] = comments);
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

  deleteComment(comment: number): void {
    this.reviewService.deleteComment(comment)
      .subscribe(() => this.getBookReviews());
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

