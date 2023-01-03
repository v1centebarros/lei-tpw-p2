import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Book } from '../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Review } from '../models/review.model';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!: User;
  user_id: number;
  session!: Session | null;
  books_from_user: Book[];
  user_age: number;
  reviews: Review[];
  avg_rating: number;
  

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

    let user_id = this.session?._user_id;
    console.log(user_id)

    this.userService.getUser(user_id).subscribe(
        (user: User) => {
            this.user = user;
            this.user_age = this.get_age();
            this.getBooksFromUser();  
            this.getUserReviews();
        }
    );
  }

  getUser(id:number) {
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

  getUserAvgRating() {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserAvgRating(id)
      .subscribe(avg => this.avg_rating = avg);
  }
}
