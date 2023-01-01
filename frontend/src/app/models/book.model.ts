import { Author } from './author.model';
import { Publisher } from './publisher.model';

export class Book {
  id: number;
  name: string;
  pages: number;
  publish_date: Date;
  authors: Author[];
  language: string;
  publisher: Publisher;
  isbn: string;
  description: string;
  image: string;
}
