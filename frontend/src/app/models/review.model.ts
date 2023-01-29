import { User } from "./user.model";
import { Book } from "./book.model";

export class Review {
    id: number;
    text: string;
    datetime: string;
    user: number;
    book: number;
    user_name: string;
    user_image: string;
}