import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base/base.component';
import { NavbarComponent } from './base/navbar/navbar.component';
import { SearchContainerComponent } from './base/search-container/search-container.component';
import { SearchFiltersContainersComponent } from './base/search-filters/search-filters-containers/search-filters-containers.component';
import { BooksContainerComponent } from './base/books-container/books-container.component';
import { BookComponent } from './base/book/book.component';
import { HttpClientModule} from "@angular/common/http";
import { BookDetailsComponent} from "./book-details/book-details.component";
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    NavbarComponent,
    SearchContainerComponent,
    SearchFiltersContainersComponent,
    BooksContainerComponent,
    BookComponent,
    BookDetailsComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
