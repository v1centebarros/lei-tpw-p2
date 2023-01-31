import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '../models/publisher.model';
import { BookService } from '../services/book.service';
import { PublisherService } from '../services/publisher.service';
import { Book } from '../models/book.model';
import { AuthService } from '../services/auth/auth.service';
import { Genre } from '../models/genre.model';

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
  genres: Genre[];
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
    this.getGenre();
    this.book2 = sessionStorage.getItem("book")
    this.book2 = JSON.parse(this.book2)
    if( this.book2.author != this.author.id){
      this.router.navigate(['/book/' + this.id +'/']);
    }

    this.form = new FormGroup({
      title: new FormControl(this.book2.title, [Validators.required]),
      pages: new FormControl(this.book2.pages, [Validators.required]),
      publishDate: new FormControl(this.book2.publish_date, [Validators.required]),
      language: new FormControl(this.book2.language,[Validators.required]),
      publisher: new FormControl(this.book2.publisher,[Validators.required]),
      genres: new FormControl(this.book2.genres, [Validators.required]),
      isbn: new FormControl(this.book2.isbn,[Validators.required]),
      description: new FormControl(this.book2.description,[Validators.required]),
      image: new FormControl(null),
    })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }

  getBook(id: number): void {
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  getGenre(): void {
    this.bookService.getBooksGenre()
      .subscribe(genres => this.genres = genres);
  }

  onSubmit(): void {
    if (this.form.valid) {
      let formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('pages', this.form.get('pages')?.value);
      formData.append('publish_date', this.form.get('publishDate')?.value);
      formData.append('language', this.form.get('language')?.value);
      formData.append('publisher', this.form.get('publisher')?.value);
      formData.append('genres', this.form.get('genres')?.value);
      formData.append('isbn', this.form.get('isbn')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('image', this.form.get('image')?.value);
      formData.append('author', this.author.id);

      if (this.form.get('image')?.value == null) {
        formData.delete('image');
      }

      this.bookService.editBook(this.id, formData).subscribe(
        (response: any) => {
          this.router.navigate(['/book/' + this.id +'/']);
        }
      );
    }

  }

}

