import { Component, OnInit } from '@angular/core';
import { Publisher } from '../models/publisher.model';
import { PublisherService } from '../services/publisher.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit{
  publishers:Publisher[];
  rating:number;

  constructor(
    private publisherService: PublisherService,
  ) { }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers(): void {
    this.publisherService.getPublishers().subscribe(publishers => this.publishers = publishers);
  }



}

