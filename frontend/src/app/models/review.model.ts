import { User } from "./user.model";
import { Book } from "./book.model";

export class Review {
    id: number;
    user: number;
    user_info: User;
    book: number;
    book_info: Book;
    review: string;
    date: string;
}