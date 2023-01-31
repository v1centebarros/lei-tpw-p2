import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AuthorService } from '../services/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit{
  response: any;
  form: FormGroup;
  image: boolean = false;
  registerFail: boolean = false;
  message: string;
  author: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authorService: AuthorService
  ) {
  }

  ngOnInit(): void {
    if (!this.authService.loggedIn()) {
      this.router.navigate(['/login']);
    }
    this.author = this.authService.getUserInfo();
    console.log(this.author)

    this.form = new FormGroup({
      name: new FormControl(this.author.name, [Validators.required]),
      newpassword: new FormControl(null),
      oldpassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl(null),
      birthDate: new FormControl(this.author.birth_date, [Validators.required]),
      nationality: new FormControl(this.author.nationality, [Validators.required]),
      description: new FormControl(this.author.description, [Validators.required]),
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
      this.editAuthor();
    }
  
  }
  editAuthor(){

    if(this.form.get('newpassword')?.value == null && this.form.get('oldpassword')?.value != null && this.form.get('confirmPassword')?.value == null ){
      let formData = null;
        formData = new FormData();
        if (this.image){
          formData = new FormData();
          formData.append('image', this.form.get("image")?.value);
          formData.append('name', this.form.value.name);
          formData.append('password', this.form.value.oldpassword);
          formData.append('birth_date', this.form.value.birthDate);
          formData.append('description', this.form.value.description);
          formData.append('nationality', this.form.value.description);
        }
        else{
          formData={
            name: this.form.value.name,
            email: this.author.email,
            password: this.form.value.oldpassword,
            birth_date: this.form.value.birthDate,
            description: this.form.value.description,
            nationality:this.form.value.nationality,
          }
        }
        console.log(formData)
        this.authorService.updateAuthor(this.author.id,formData).subscribe(
          (res) => {
            if ("error" in res){
              this.message = res.error;
              this.registerFail = true;
              return;
            }
            this.registerFail = false;
            this.response = res;
            sessionStorage.setItem("name", this.response.name)
            sessionStorage.setItem("email", this.response.email)
            sessionStorage.setItem("id", this.response.id)
            sessionStorage.setItem("image", this.response.image)
            sessionStorage.setItem("description", this.response.description)
            sessionStorage.setItem("nationality", this.response.nationality)
            sessionStorage.setItem("birth_date", this.response.birth_date)
            this.router.navigate(['/author/' + this.author.id +"/"]);
          },
        );
    }
    else {
      console.log(this.form.get('newpassword')?.value)
      console.log(this.form.get('oldpassword')?.value)
      console.log(this.form.get('confirmPassword')?.value)

      if(this.form.get('newpassword')?.value != null && this.form.get('oldpassword')?.value != null && this.form.get('confirmPassword')?.value != null ){
        if(this.form.get('newpassword')?.value != this.form.get('confirmPassword')?.value){
          this.registerFail = true;
          this.message = "Passwords don't match";
          return;
        }
        let formData = null;
        if (this.image){
          formData = new FormData();
          formData.append('image', this.form.get("image")?.value);
          formData.append('name', this.form.value.name);
          formData.append('oldpassword', this.form.value.oldpassword);
          formData.append('newpassword', this.form.value.newpassword);
          formData.append('birth_date', this.form.value.birthDate);
          formData.append('description', this.form.value.description);
          formData.append('nationality', this.form.value.nationality);

        }
        else{
          formData={
            name: this.form.value.name,
            email: this.author.email,
            oldpassword: this.form.value.oldpassword,
            newpassword: this.form.value.newpassword,
            birth_date: this.form.value.birthDate,
            description: this.form.value.description,
            nationality:this.form.value.nationality,
          }
        }
        console.log(formData)
        this.authorService.updateAuthor(this.author.id,formData).subscribe(
          (res) => {
            if ("error" in res) {
              this.registerFail = true;
              this.message = res.error;
              return;
            }
            this.registerFail = false;
            this.response = res;
            sessionStorage.setItem("name", this.response.name)
            sessionStorage.setItem("email", this.response.email)
            sessionStorage.setItem("id", this.response.id)
            sessionStorage.setItem("image", this.response.image)
            sessionStorage.setItem("description", this.response.description)
            sessionStorage.setItem("nationality", this.response.nationality)
            sessionStorage.setItem("birth_date", this.response.birth_date)
            this.router.navigate(['/author/' + this.author.id +"/"]);
          },
        );
      }
      else{
        this.registerFail = true;
        this.message = "Error in update profile"
      }
    }
    
  
  }
  cancelar(){
    this.router.navigate(['/author/' + this.author.id +"/"]);
  }
}
