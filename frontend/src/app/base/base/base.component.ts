import { Component, Input } from '@angular/core';
import { Search } from '../../models/search.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {
  query: string;
  avg_rating: number;
  year: number;
  publisher: string;
  language: string;


  constructor() { 
  }

  onSearchChanged(search: Search): void {
    this.query = search.query;
    this.avg_rating = search.avg_rating;
    this.year = search.year;
    this.publisher = search.publisher;
    this.language = search.language;
  }

}
