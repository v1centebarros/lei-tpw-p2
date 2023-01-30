import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../models/author.model';
import { AuthorService } from '../services/author.service';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  author: Author;
  books: Book[];
  image: any;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAuthor();
    this.getAuthorBooks();
    this.getImage();
  }

  getAuthor(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id')!);
    this.authorService.getAuthor(id).subscribe(author => this.author = author);
  }

  getAuthorBooks(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id')!);
    this.bookService.getAuthorBooks(id).subscribe(books => this.books = books);
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

  getImage(){
    console.log("get image")
    // let image = this.user.image
    let image = null
    if(image != null){
      this.image = "http://localhost:8000/" + this.author.image;
    }
    else
      this.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }

}
