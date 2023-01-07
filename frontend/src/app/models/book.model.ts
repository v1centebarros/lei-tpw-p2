import { User } from './user.model';
import { Publisher } from './publisher.model';

export class Book {
  id: number;
  name: string;
  pages: number;
  publish_date: Date;
  author_info: User;
  language: string;
  publisher: Publisher;
  isbn: string;
  description: string;
  image: string;
}
