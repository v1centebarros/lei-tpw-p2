import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{
    response: any;
    form: FormGroup;
    image: boolean = false;
    registerFail: boolean = false;

    constructor(
      private authService: AuthService,
      private router: Router
    ) {
    }

    ngOnInit(): void {
      this.form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl(null)
      });
    }
    
    onFileChange(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.form.get('image')?.setValue(file);
        this.image = true ;
      }
      else{
        this.image = false;
      }
    }

    onSubmit() {
      if( this.form.valid){
        this.registerUser();
      }
    
    }
    registerUser(){

      // Validar password
      if(this.form.get('password')?.value != this.form.get('confirmPassword')?.value){
        this.registerFail = true;
        return;
      }
      else{
        let formData = null;
        if (this.image){
          formData = new FormData();
          formData.append('image', this.form.get("image")?.value);
          formData.append('username', this.form.value.username);
          formData.append('email', this.form.value.email);
          formData.append('password', this.form.value.password);
          formData.append('birth_date', this.form.value.birthDate);
          formData.append('first_name', this.form.value.firstName);
          formData.append('last_name', this.form.value.lastName);
          formData.append('description', this.form.value.description);
        }
        else{
          formData={
            username: this.form.value.username,
            email: this.form.value.email,
            password: this.form.value.password,
            birth_date: this.form.value.birthDate,
            first_name: this.form.value.firstName,
            last_name: this.form.value.lastName,
            description: this.form.value.description,
          }
        }

        this.authService.registerUser(formData).subscribe(response => {
          this.response = response;
          // ! ALTERAR ERROS MENSAGES
  
            if ('error' in response) {
              this.registerFail = true;
              this.form.reset();
            }
            else
              this.router.navigate(['/login']);
    

        });
      }
    }
  }
