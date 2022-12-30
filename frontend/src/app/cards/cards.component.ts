import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  template:`
  <h6 class="category text-info">{{title}}</h6>
  `
})
export class CardsComponent implements OnInit{
    @Input() title?: number;
    
    constructor() { }
  
    ngOnInit(): void {
    }
  

}
