import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {

  loginForm: FormGroup;
  loginFail: boolean = false;

  constructor( private authService: AuthService,
               private router: Router ) {
  }

  ngOnInit(): void {
    console.log(this.authService.loggedIn())
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);

    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    sessionStorage.clear();
    console.log(this.loginForm.value.email)
    console.log(this.loginForm.value.password)

    let header = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }
    
  

    if (this.loginForm.valid){
      this.authService.authenticate(header).subscribe(
        response => {
          console.log(response)
          if ('error' in response) {
            // ! COLOCAR MENSAGES ERROR IGUAIS AO DO RESPONSE
            console.log(response.error)
            this.loginFail = true;
          }
          else {
            sessionStorage.setItem('id', response.id);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('type', response.type);
            sessionStorage.setItem('token', response.token);

            if (response.type == 'user') {
              sessionStorage.setItem('first_name', response.first_name);
              sessionStorage.setItem('last_name', response.last_name);
            } else{
              sessionStorage.setItem('name', response.name);
            }
            this.loginFail = false;
            window.location.href = '';

          }
        });
    }
  }
}
