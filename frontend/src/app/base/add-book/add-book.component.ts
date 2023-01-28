import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Publisher } from 'src/app/models/publisher.model';
import { PublisherService } from 'src/app/services/publisher.service';
import { BookService } from 'src/app/services/book.service';
import { Session } from 'src/app/models/session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  publishers: Publisher[];
  languages: String[] = ['English', 'Spanish', 'Portuguese'];
  session!: Session | null;

  form: FormGroup;

  constructor(
    private publisherService: PublisherService,
    private bookService: BookService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      pages: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      publishDate: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null),
    }),
    this.session = Session.getCurrentSession();

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
    }
  }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers(): void {
    this.publisherService.getPublishers()
      .subscribe(publishers => this.publishers = publishers);
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
      formData.append('author', '1');
      
      this.bookService.addBook(formData).subscribe(
        (response: any) => {
          console.log(response);
        }
      );
    }

  }

}
