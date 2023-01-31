import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup-author',
  templateUrl: './signup-author.component.html',
  styleUrls: ['./signup-author.component.css']
})
export class SignupAuthorComponent implements OnInit {
  response: any;
  form: FormGroup;
  image: boolean = false;
  registerFail: boolean = false;
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null)
    });
  }

  onFileChange(event: any) {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
      this.image = true;
    }
    else {
      this.image = false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.registerAuthor();
    }

  }
  registerAuthor() {

    // Validar password
    if (this.form.get('password')?.value != this.form.get('confirmPassword')?.value) {
      this.registerFail = true;
      return;
    }
    else {
      let formData = null;
      if (this.image) {
        formData = new FormData();
        formData.append('image', this.form.get("image")?.value);
        formData.append('name', this.form.value.name);
        formData.append('email', this.form.value.email);
        formData.append('password', this.form.value.password);
        formData.append('birth_date', this.form.value.birthDate);
        formData.append('description', this.form.value.description);
        formData.append('nationality', this.form.value.description);
      }
      else {
        formData = {
          name: this.form.value.name,
          email: this.form.value.email,
          password: this.form.value.password,
          birth_date: this.form.value.birthDate,
          description: this.form.value.description,
          nationality: this.form.value.nationality,
        }
      }

      this.authService.registerAuthor(formData).subscribe(response => {
        this.response = response;
        if ('error' in response) {
          this.registerFail = true;
          this.form.reset();
          this.message = response.error;
        }
        else
          this.router.navigate(['/login']);
      });
    }
  }
}
