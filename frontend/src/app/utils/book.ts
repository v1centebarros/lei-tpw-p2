import { Author } from "./author";
import { Publisher } from "./publisher";

export class Book {
    id: number;
    name: string;
    pages: number;
    publishDate: Date;
    language: string;
    authors: Author[];
    publisher: Publisher;
    isbn: string;
    description: string;
  
    constructor(id: number, name: string, pages: number, publishDate: Date, language: string, authors: Author[], publisher: Publisher, isbn: string, description: string) {
      this.id = id;
      this.name = name;
      this.pages = pages;
      this.publishDate = publishDate;
      this.language = language;
      this.authors = authors;
      this.publisher = publisher;
      this.isbn = isbn;
      this.description = description;
    }
  
    getSummary() {
      return `${this.name} is a ${this.pages}-page book published by ${this.publisher.name} on ${this.publishDate}. It is written in ${this.language} and has an ISBN of ${this.isbn}.`;
    }
  }
  