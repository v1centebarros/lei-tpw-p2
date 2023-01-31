import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '../models/publisher.model';
import { BookService } from '../services/book.service';
import { PublisherService } from '../services/publisher.service';
import { Book } from '../models/book.model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{

  publishers: Publisher[];
  languages: String[] = ['English', 'Spanish', 'Portuguese'];
  form: FormGroup;
  book: Book;
  id: number;
  author: any;
  book2: any;

  constructor(
    private publisherService: PublisherService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,

  ) {
    this.book = new Book();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  ngOnInit() {
    this.id = +Number(this.route.snapshot.paramMap.get('id'));
    if(this.authService.loggedIn() == false){
      this.router.navigate(['/login']);
    }
    if(this.authService.getUserInfo().type != 'author'){
      this.router.navigate(['/book/' + this.id +'/']);
    }
    this.author = this.authService.getUserInfo();

    this.getPublishers();
    this.getBook(this.id);
    this.book2 = sessionStorage.getItem("book")
    this.book2 = JSON.parse(this.book2)
    
    console.log(this.book2)
    this.form = new FormGroup({
      title: new FormControl(this.book2.title, [Validators.required]),
      pages: new FormControl(this.book2.pages, [Validators.required]),
      publishDate: new FormControl(this.book2.publish_date, [Validators.required]),
      language: new FormControl(this.book2.language,[Validators.required]),
      publisher: new FormControl(this.book2.publisher,[Validators.required]),
      isbn: new FormControl(this.book2.isbn,[Validators.required]),
      description: new FormControl(this.book2.description,[Validators.required]),
      image: new FormControl(null),
    })
  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }

  getBook(id: number): void {
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        title: this.form.get('title')?.value,
        pages: this.form.get('pages')?.value,
        publish_date: this.form.get('publishDate')?.value,
        language: this.form.get('language')?.value,
        publisher: this.form.get('publisher')?.value,
        isbn: this.form.get('isbn')?.value,
        description: this.form.get('description')?.value,
        image: this.form.get('image')?.value,
        author: this.author.id,
        avg_rating: this.book2.avg_rating,
        num_ratings: this.book2.num_ratings,
        id: this.id
      }
      console.log(formData);
      this.bookService.editBook(this.id, formData).subscribe(
        (response: any) => {
          this.router.navigate(['/book/' + this.id +'/']);
        }
      );
    }

  }

}

