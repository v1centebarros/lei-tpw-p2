import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';

import {AuthorsComponent} from "./authors/authors.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AddBookComponent} from "./base/add-book/add-book.component";
const routes: Routes = [
  { path: 'home', component: BaseComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'book/add', component:AddBookComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
