import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';

import {AuthorsComponent} from "./authors/authors.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
const routes: Routes = [
  { path: 'home', component: BaseComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'authors', component: AuthorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
