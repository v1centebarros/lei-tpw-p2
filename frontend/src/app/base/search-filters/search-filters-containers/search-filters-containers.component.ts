import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {PublisherService} from "../../../services/publisher.service";
import {Publisher} from "../../../models/publisher.model";
import {BookService} from "../../../services/book.service";
import { Search } from '../../../models/search.model';

@Component({
  selector: 'app-search-filters-containers',
  templateUrl: './search-filters-containers.component.html',
  styleUrls: ['./search-filters-containers.component.css']
})
export class SearchFiltersContainersComponent implements OnInit {
  @Output() searchChanged = new EventEmitter<Search>();
  years: string[] = [];
  ratings: number[] = [1, 2, 3, 4, 5];
  languages: string[] = ['English', 'Spanish', 'Portuguese'];
  publishers: Publisher[] = [];
  query: string = '';
  avg_rating: number = 0;
  year: string = '';
  publisher: string = '';
  language: string = '';


  constructor(
    private publisherService: PublisherService,
    private bookService: BookService
  ){}

  ngOnInit() {
    this.getPublishers();
    this.getBooksYearsAvailable();
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(publishers => this.publishers = publishers);
  }

  getBooksYearsAvailable(): void {
    this.bookService.getAvailableYears().subscribe(years => this.years = years);
  }

  onSearchChanged(): void {
    this.searchChanged.emit({
      query: this.query,
      avg_rating: this.avg_rating,
      year: this.year,
      publisher: this.publisher,
      language: this.language,
    });
  }

}
