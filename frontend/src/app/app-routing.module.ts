import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';
import {AuthorsComponent} from "./authors/authors.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AddBookComponent} from "./base/add-book/add-book.component";
import {ProfileComponent} from "./profile/profile.component";
import {PublisherComponent} from "./publisher/publisher.component";
import { AuthorProfileComponent } from './author-profile/author-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BaseComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'addbook', component:AddBookComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'author/:id', component: AuthorProfileComponent},
  { path: 'publisher/:id', component: PublisherComponent },
  { path:'signup',component:SignupComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
