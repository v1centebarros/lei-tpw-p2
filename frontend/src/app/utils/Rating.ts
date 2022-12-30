import { CustomUser } from "./user";
import { Book } from "./book";

export class Rating {
    id: number;
    user: CustomUser;
    book: Book;
    rating: number;
  
    constructor(id: number, user: CustomUser, book: Book, rating: number) {
      this.id = id;
      this.user = user;
      this.book = book;
      this.rating = rating;
    }
  }