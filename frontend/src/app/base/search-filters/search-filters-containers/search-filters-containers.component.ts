import {Component, OnInit} from '@angular/core';
import {PublisherService} from "../../../services/publisher.service";
import {Publisher} from "../../../models/publisher.model";
import {BookService} from "../../../services/book.service";
import {Book} from "../../../models/book.model";

@Component({
  selector: 'app-search-filters-containers',
  templateUrl: './search-filters-containers.component.html',
  styleUrls: ['./search-filters-containers.component.css']
})
export class SearchFiltersContainersComponent implements OnInit {
  years: Number[] = [];
  ratings: number[] = [1, 2, 3, 4, 5];
  languages: string[] = ['English', 'French', 'German', 'Spanish', 'Italian', 'Russian', 'Chinese', 'Japanese', 'Portuguese'];

  publishers: Publisher[] = [];
  constructor(
    private publisherService: PublisherService,
    private bookService: BookService
  ){ }

  ngOnInit() {
    this.getPublishers();
    this.getBooksYearsAvailable();
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(publishers => this.publishers = publishers);
  }

  getBooksYearsAvailable(): void {
    this.bookService.getBooks().subscribe(books => {
      books.forEach(book => {
        let bookDate = new Date(book.publish_date);
        let bookYear = bookDate.getFullYear();
        if (!this.years.includes(bookYear)) {
          this.years.push(bookYear);
        }
      });
    }
    );
  }
}
