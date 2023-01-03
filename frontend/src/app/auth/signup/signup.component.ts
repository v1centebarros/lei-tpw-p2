import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{

    form: FormGroup;

    constructor(private authService: AuthService,) {
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

    ngOnInit(): void {
    }

    onSubmit() {

          // @ts-ignore
          let username = this.form.get("username").value;

          // @ts-ignore
          let email = this.form.get("email").value;

          // @ts-ignore
          let password = this.form.get("password").value;

          // @ts-ignore
          let confirmPassword = this.form.get("confirmPassword").value;

          // @ts-ignore
          let birthDate = this.form.get("birthDate").value;

          // @ts-ignore
          let firstName = this.form.get("firstName").value;


          // @ts-ignore
          let lastName = this.form.get("lastName").value;

          // @ts-ignore
          let description = this.form.get("description").value;

          // @ts-ignore
          let image = this.form.get("image").value;

          if (password !== confirmPassword) {
              alert("Passwords don't match");
              return;
          }
              
          this.authService.register( email,username, password, firstName, lastName, description, birthDate).subscribe({
              next: items =>
              {
                  console.log("User registered");
          
                setTimeout(() => {
                  window.location.replace("/login");
              });

              },
              error: err => {
                  console.log(err);
              }
          });

        }
    }