import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Book } from '../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Review } from '../models/review.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;
  books_from_user: Book[];
  user_age: number;
  reviews: Review[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser();
    this.getBooksFromUser();
    this.getUserReviews();
  }

  getUser() {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  getBooksFromUser() {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getBooksFromUser(id)
      .subscribe(books => this.books_from_user = books);
  }

  get_age() {
    const today = new Date();
    const birthDate = new Date(this.user.birth_date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getUserReviews() {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserReviews(id)
      .subscribe(reviews => this.reviews = reviews);
  }

}
