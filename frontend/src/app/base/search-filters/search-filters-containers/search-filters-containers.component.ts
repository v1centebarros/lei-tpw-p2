import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {PublisherService} from "../../../services/publisher.service";
import {Publisher} from "../../../models/publisher.model";
import {BookService} from "../../../services/book.service";
import { Year } from '../../../models/year.model';
import { Language } from '../../../models/language.model';
import { Search } from '../../../models/search.model';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-search-filters-containers',
  templateUrl: './search-filters-containers.component.html',
  styleUrls: ['./search-filters-containers.component.css']
})
export class SearchFiltersContainersComponent implements OnInit {
  @Output() searchChanged = new EventEmitter<Search>();
  years: Year[] = [];
  ratings: number[] = [1, 2, 3, 4, 5];
  languages: Language[] = [];
  query: string;
  avg_rating: number;
  year: number;
  publisher: string;
  language: string;


  publishers: Publisher[] = [];
  constructor(
    private publisherService: PublisherService,
    private bookService: BookService
  ){ }

  ngOnInit() {
    this.getPublishers();
    this.getBooksYearsAvailable();
    this.getBookLanguagesAvailable();
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(publishers => this.publishers = publishers);
  }

  getBooksYearsAvailable(): void {
    this.bookService.getAvailableYears().subscribe(years => this.years = years);
  }

  getBookLanguagesAvailable(): void {
    this.bookService.getAvailableLanguages().subscribe(languages => this.languages = languages);
  }

  onSearchChanged(): void {
    this.searchChanged.emit({
      query: this.query,
      avg_rating: this.avg_rating,
      year: this.year,
      publisher: this.publisher,
      language: this.language
    });
  }

}
