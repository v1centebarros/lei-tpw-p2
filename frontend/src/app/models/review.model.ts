import { User } from "./user.model";

export class Review {
    id: number;
    user_info: User;
    book: number;
    review: string;
    date: string;
}