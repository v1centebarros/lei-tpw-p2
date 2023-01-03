import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor( private authService: AuthService ) {
    this.form = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    // @ts-ignore
    let username = this.form.get("username").value;
    // @ts-ignore
    let password = this.form.get("password").value;

    console.log(password)

    this.authService.login(username, password).subscribe({
      next: session =>{
        localStorage.setItem('user', JSON.stringify(session));

        setTimeout(() => {
          window.location.replace("/home");
      }, 1000);
      
      },
      error: err => {
        console.log(err);
      }
    });


    this.form.reset();

  }

}
