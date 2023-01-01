import { User } from "./user.model";

export class Review {
    id: number;
    user: User;
    book: number;
    review: string;
    date: string;
}