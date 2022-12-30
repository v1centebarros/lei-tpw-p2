import { CustomUser } from "./user";
import { Book } from "./book";

export class Review {
    id: number;
    user: CustomUser;
    book: Book;
    review: string;
  
    constructor(id: number, user: CustomUser, book: Book, review: string) {
      this.id = id;
      this.user = user;
      this.book = book;
      this.review = review;
    }
  }