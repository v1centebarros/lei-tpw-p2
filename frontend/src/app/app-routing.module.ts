import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';
import {AuthorsComponent} from "./authors/authors.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {LoginComponent} from "./auth/login/login.component";
import {AddBookComponent} from "./base/add-book/add-book.component";
import {ProfileComponent} from "./profile/profile.component";
import {PublisherComponent} from "./publisher/publisher.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SignupAuthorComponent } from './auth/signup-author/signup-author.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { PublishersComponent } from './publishers/publishers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { EditBookComponent } from './edit-book/edit-book.component';
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
  { path: 'publishers', component: PublishersComponent },
  { path: 'publisher/:id', component: PublisherComponent },
  { path: 'signupReader',component:SignupComponent},
  { path: 'signupAuthor',component:SignupAuthorComponent},
  { path: "settings", component:EditProfileComponent},
  { path: "authorSettings", component:EditAuthorComponent},
  { path: "editBook/:id", component:EditBookComponent},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
