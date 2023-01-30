import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base/base.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { SearchFiltersContainersComponent } from './base/search-filters/search-filters-containers/search-filters-containers.component';
import { BooksContainerComponent } from './base/books-container/books-container.component';
import { BookComponent } from './base/book/book.component';
import { HttpClientModule} from "@angular/common/http";
import { BookDetailsComponent} from "./book-details/book-details.component";
import { AuthorsComponent } from './authors/authors.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddBookComponent } from './base/add-book/add-book.component';
import { ProfileComponent } from './profile/profile.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SignupAuthorComponent } from './auth/signup-author/signup-author.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { PublishersComponent } from './publishers/publishers.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavbarComponent,
    SearchFiltersContainersComponent,
    BooksContainerComponent,
    BookComponent,
    BookDetailsComponent,
    AuthorsComponent,
    LoginComponent,
    SignupComponent,
    AddBookComponent,
    ProfileComponent,
    PublisherComponent,
    SignupAuthorComponent,
    AuthorProfileComponent,
    PublishersComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
