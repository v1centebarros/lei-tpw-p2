import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Publisher } from 'src/app/models/publisher.model';
import { Language } from 'src/app/models/language.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { BookService } from 'src/app/services/book.service';
import { Book, BookPost } from 'src/app/models/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  publishers: Publisher[];
  languages: Language[];

  form: FormGroup;

  constructor(
    private publisherService: PublisherService,
    private bookService: BookService
  ) {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'pages': new FormControl('', [Validators.required,
        Validators.pattern('^[0-9]*$')]),
      'publishDate': new FormControl('', [Validators.required]),
      'language': new FormControl('', [Validators.required]),
      'publisher': new FormControl('', [Validators.required]),
      'isbn': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'image': new FormControl('', [Validators.required]),
    })

  }

  ngOnInit() {
    this.getLanguages();
    this.getPublishers();
  }

  getLanguages(): void {
    this.bookService.getAvailableLanguages()
      .subscribe(languages => this.languages = languages);
  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
  }

  onSubmit(): void {
    const form_data = this.form.value;
    const book: BookPost = {
      author: 1,
      name: form_data.name,
      pages: form_data.pages,
      publish_date: form_data.publishDate,
      language: form_data.language,
      publisher: form_data.publisher,
      isbn: form_data.isbn,
      description: form_data.description,
      image: form_data.image,
    }

    this.bookService.addBook(book).subscribe();
  }

}
