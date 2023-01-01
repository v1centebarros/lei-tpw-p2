import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  form: FormGroup;

  constructor() {
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

}
