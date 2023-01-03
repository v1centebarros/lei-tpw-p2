import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Review } from '../models/review.model';
import { Session } from '../models/session.model';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User;
  user_id: number;
  session!: Session | null;
  user_age: number;
  reviews: Review[];
  avg_rating: number;
  books: Book[];


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.user = User.getNullUser();
    this.user_age = 0;
    this.avg_rating = 0;
    this.session = Session.getCurrentSession();

  }

  ngOnInit() {
    if (this.session === null) return;

    const url_id = +Number(this.route.snapshot.paramMap.get('id')!);
    if ( url_id !== 0) {
      this.user_id = url_id;
    } else {
      this.user_id = this.session.get_user_id();
    }

    this.getUser(this.user_id);
    this.getUserReviews();
    this.getUserBooks();
  }

  getUser(id:number) {
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  get_age(birth_data: string) {
    const today = new Date();
    const birthDate = new Date(birth_data);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getUserReviews() {
    this.userService.getUserReviews(this.user_id)
      .subscribe(reviews => this.reviews = reviews);
  }

  getUserBooks() {
    this.userService.getBooksFromUser(this.user_id)
      .subscribe(books => this.books = books);
  }

}
