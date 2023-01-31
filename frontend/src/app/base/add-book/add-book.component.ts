import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Publisher } from 'src/app/models/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { BookService } from 'src/app/services/book.service';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/genre.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  publishers: Publisher[];
  languages: String[] = ['English', 'Spanish', 'Portuguese'];
  genres: Genre[];
  id: any;

  form: FormGroup;

  constructor(
    private publisherService: PublisherService,
    private bookService: BookService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  ngOnInit() {
    if (this.authService.loggedIn() == false && this.authService.getUserInfo().type != 'author') {
      this.router.navigate(['/login']);
    }
    this.getPublishers();
    this.getGenre();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      pages: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      publishDate: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    });

    this.id = this.authService.getUserInfo().id;

  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }

  getGenre(): void {
    this.bookService.getBooksGenre()
      .subscribe(genres => this.genres = genres);
  }


  onSubmit(): void {
    if (this.form.valid) {
      const formData = {
        title: this.form.value.title,
        pages: this.form.value.pages,
        publish_date: this.form.value.publishDate,
        language: this.form.value.language,
        publisher: this.form.value.publisher,
        isbn: this.form.value.isbn,
        description: this.form.value.description,
        genres: +Number(this.form.value.genre),
        author: String(this.id),
        //image: this.form.get('image')?.value
      }

      console.log(formData);
      this.bookService.addBook(formData).subscribe(
        (response: any) => {
          this.router.navigate(['/books']);
        }
      );
    }

  }

}
