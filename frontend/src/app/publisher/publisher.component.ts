import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { Publisher } from '../models/publisher.model';
import { AuthService } from '../services/auth/auth.service';
import { PublisherService } from '../services/publisher.service';
import { UserService } from '../services/user.service';
import { Author } from '../models/author.model';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {

  publisher : Publisher;
  books: Book[];
  logo: any;
  user: any;
  logged: boolean = false;
  text_fav: string = "Add Fav";
  state_fav: boolean = false;
  avgRating:number = 0;
  authors: Author[] = [];
  qrInfo: any;

  constructor(
    private publisherService: PublisherService,
    private route: ActivatedRoute,
    private authenticationService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getPublisher();
    this.getPublisherBooks();
    this.getLogo();
    if (this.authenticationService.loggedIn() && this.authenticationService.getUserInfo().type == "user"){
      this.user = this.authenticationService.getUserInfo();
      this.verifyFav();
      this.logged = true;
    }
    this.getAuthors();
    let  website = this.publisher.website
    this.qrInfo = window.location.href;
  }

  getPublisher(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id')!);
    this.publisherService.getPublisher(id).subscribe(publisher => this.publisher = publisher);
  }

  getAuthors(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id')!);
    this.publisherService.getPublisherAuthors(id).subscribe(authors => this.authors = authors);
  }

  getPublisherBooks(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id')!);
    this.publisherService.getPublisherBooks(id).subscribe(books =>
       this.books = books,
        error => console.log(error),
        () =>
          this.books.forEach(book =>
            this.avgRating += book.avg_rating),
    );
  }

  getLogo() {
     // let logo = this.publisher.logo
     let logo = null
     if(logo != null){
       this.logo = "http://localhost:8000/" + this.publisher.logo;
     }
     else
       this.logo = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
   }
  
  verifyFav(){
    this.userService.getUserFavPublisher(this.user.id).subscribe(publishers => {
      for (let publisher of publishers){
        if (publisher.id == this.publisher.id){
          this.text_fav = "Remove Fav";
          this.state_fav = true;
          break;
        }
      }
    });
  }

  addFav():void {
    if (this.user !== null && this.user.type == "user") {
      if (this.state_fav) {
        this.text_fav = "Add Fav";
        this.userService.removeFavPublisher(this.user.id, this.publisher.id)
          .subscribe(() => this.state_fav = false);
      } else {
        this.text_fav = "Remove Fav";
        this.userService.addFavPublisher(this.user.id, this.publisher.id)
          .subscribe(() => this.state_fav = true);
      }
    } else {
      alert("You must be logged in to add a favorite");
    }
  }

}
