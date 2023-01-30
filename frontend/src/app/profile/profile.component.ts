import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Review } from '../models/review.model';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Publisher } from '../models/publisher.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: User;
  user_id: number;
  user_age: number;
  reviews: Review[];
  avg_rating: number;
  books: Book[];
  authors : Author[];
  publishers : Publisher[];
  image:any;


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService

  ) {
    this.user = User.getNullUser();
    this.user_age = 0;
    this.avg_rating = 0;
  }

  ngOnInit() {
    if(!this.authService.loggedIn()){
      window.location.href = '/login';
    }

    this.user_id = +Number(this.authService.getUserInfo().id);

    this.getUser(this.user_id);
    this.getImage()
    this.getUserReviews();
    this.getUserBooks();
    this.getUserAuthors();
    this.getUserPublishers();
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
    this.userService.getUserFavBook(this.user_id)
      .subscribe(books => this.books = books);
  }

  getUserAuthors() {
    this.userService.getUserFavAuthor(this.user_id)
      .subscribe(authors => this.authors = authors);
  }

  getUserPublishers() {
    this.userService.getUserFavPublisher(this.user_id)
      .subscribe(publishers => this.publishers = publishers);
  }

  getImage(){
    console.log("get image")
    let image = this.user.image
    if(image != null){
      this.image = "http://localhost:8000/" + this.user.image;
    }
    else
      this.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }

}
