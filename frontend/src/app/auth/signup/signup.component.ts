import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    form: FormGroup;

    constructor() {
      this.form = new FormGroup({
        'username': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required]),
        'confirmPassword': new FormControl('', [Validators.required]),
        'birthDate': new FormControl('', [Validators.required]),
        'firstName': new FormControl('', [Validators.required]),
        'lastName': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'image': new FormControl('', [Validators.required]),
      });
    }

    onSubmit() {

    }


}
