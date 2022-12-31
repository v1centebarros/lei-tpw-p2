import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base/base.component';
import { BookDetailsComponent } from './base/book-details/book-details.component';
const routes: Routes = [
  { path: 'home', component: BaseComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'bookdetails/:id', component: BookDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
