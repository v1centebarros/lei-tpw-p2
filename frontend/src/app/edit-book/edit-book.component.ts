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
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    if(this.authService.loggedIn() == false){
      this.router.navigate(['/login']);
    }
    if(this.authService.getUserInfo().type != 'author'){
      this.router.navigate(['/book/' + id +'/']);
    }

    this.getPublishers();
    this.getBook(id);
    this.form = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required]),
      pages: new FormControl(this.book.pages, [Validators.required, Validators.pattern('^[0-9]*$')]),
      publishDate: new FormControl(this.book.publish_date, [Validators.required]),
      language: new FormControl(this.book.language, [Validators.required]),
      publisher: new FormControl(this.book.publisher, [Validators.required]),
      isbn: new FormControl(this.book.isbn, [Validators.required]),
      description: new FormControl(this.book.description, [Validators.required]),
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
      const formData = new FormData();
      formData.append('title', this.form.value.title);
      formData.append('pages', this.form.value.pages);
      formData.append('publish_date', this.form.value.publishDate);
      formData.append('language', this.form.value.language);
      formData.append('publisher', this.form.value.publisher);
      formData.append('isbn', this.form.value.isbn);
      formData.append('description', this.form.value.description);
      formData.append('image', this.form.get('image')?.value);
      formData.append('author', '1'); //Change this to the current user
      
      this.bookService.addBook(formData).subscribe(
        (response: any) => {
          console.log(response);
        }
      );
    }

  }

}

