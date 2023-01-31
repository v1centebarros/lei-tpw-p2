import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  response: any;
  form: FormGroup;
  image: boolean = false;
  registerFail: boolean = false;
  user: any;
  message: string ;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/login']);
    }
    this.user = this.authService.getUserInfo();
    console.log(this.user)
    this.form = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
      oldpassword: new FormControl(null),
      newpassword: new FormControl(null),
      confirmnewpassword: new FormControl(null),
      birthDate: new FormControl(this.user.birth_date, [Validators.required]),
      firstName: new FormControl(this.user.first_name, [Validators.required]),
      lastName: new FormControl(this.user.last_name, [Validators.required]),
      description: new FormControl(this.user.description, [Validators.required]),
      image: new FormControl(null)
    });
  }

  onFileChange(event: any) {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('image')?.setValue(file);
      console.log(file)
      console.log(this.form.get('image')?.value)
      this.image = true;
    }
    else {
      this.image = false;
    }
  }


  onSubmit() {
    if( this.form.valid){
      this.editUser();
    }
  }
  editUser(){
    if(this.form.get('newpassword')?.value == null && this.form.get('oldpassword')?.value != null && this.form.get('confirmnewpassword')?.value == null ){
      let formData = null;

      if (this.image){
        formData = {
          username: this.form.value.username,
          email: this.user.email,
          password: this.form.value.oldpassword,
          birth_date: this.form.value.birthDate,
          first_name: this.form.value.firstName,
          last_name: this.form.value.lastName,
          description: this.form.value.description,
          image: this.form.get('image')?.value
        }
      }
      else{
        formData={
          username: this.form.value.username,
          email: this.user.email,
          password: this.form.value.oldpassword,
          birth_date: this.form.value.birthDate,
          first_name: this.form.value.firstName,
          last_name: this.form.value.lastName,
          description: this.form.value.description,
        }
      }
      console.log(formData)
      this.userService.updateUser(this.user.id, formData).subscribe(

        (response) => {
          if ("error" in response) {
            this.registerFail = true;
            this.message = response.error;
            return;
          }
          this.registerFail = false;
          this.response = response;
          sessionStorage.setItem('username', this.response.username);
          sessionStorage.setItem('email', this.response.email);
          sessionStorage.setItem('password', this.response.password);
          sessionStorage.setItem('birth_date', this.response.birth_date);
          sessionStorage.setItem('first_name', this.response.first_name);
          sessionStorage.setItem('last_name', this.response.last_name);
          sessionStorage.setItem('description', this.response.description);
          sessionStorage.setItem('image', this.response.image);
          sessionStorage.setItem('id', this.response.id);

          this.router.navigate(['/profile']);
        }
      );
    }
    else if(this.form.get('newpassword')?.value != null && this.form.get('oldpassword')?.value != null && this.form.get('confirmnewpassword')?.value != null ){
      if(this.form.get('newpassword')?.value != this.form.get('confirmnewpassword')?.value){
        this.registerFail = true;
        this.message = "Passwords don't match";
        return;
      }
      let formData = null;
      if (this.image){
        formData = new FormData();
        formData.append('image', this.form.get("image")?.value);
        formData.append('username', this.form.value.username);
        formData.append('email', this.form.value.email);
        formData.append('oldpassword', this.form.value.oldpassword);
        formData.append('newpassword', this.form.value.newpassword);
        formData.append('birth_date', this.form.value.birthDate);
        formData.append('first_name', this.form.value.firstName);
        formData.append('last_name', this.form.value.lastName);
        formData.append('description', this.form.value.description);
      }
      else{
        formData={
          username: this.form.value.username,
          email: this.user.email,
          oldpassword: this.form.value.oldpassword,
          newpassword: this.form.value.newpassword,
          birth_date: this.form.value.birthDate,
          first_name: this.form.value.firstName,
          last_name: this.form.value.lastName,
          description: this.form.value.description,
        }
      }
      this.userService.updateUser(this.user.id, formData).subscribe(
        (response) => {
          if ("error" in response) {
            this.registerFail = true;
            this.message = response.error;
            return;
          }
          this.registerFail = false;
          this.response = response;
          sessionStorage.setItem('username', this.response.username);
          sessionStorage.setItem('email', this.response.email);
          sessionStorage.setItem('password', this.response.password);
          sessionStorage.setItem('birth_date', this.response.birth_date);
          sessionStorage.setItem('first_name', this.response.first_name);
          sessionStorage.setItem('last_name', this.response.last_name);
          sessionStorage.setItem('description', this.response.description);
          sessionStorage.setItem('image', this.response.image);
          sessionStorage.setItem('id', this.response.id);
          this.router.navigate(['/profile']);
        }
      );
    }
    else{
      this.registerFail = true;
      this.message = "Error in update profile"
    }
  }

  cancelar(){
    this.router.navigate(['/profile']);
  }
}

