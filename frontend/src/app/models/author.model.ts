import { User } from './user.model';
import { Publisher } from './publisher.model';

export class Author {
    id: number;
    user: User;
    publishers: Publisher[];
}