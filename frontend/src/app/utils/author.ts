import { CustomUser } from "./user";
import { Publisher } from "./publisher";

export class Author {
    id: number;
    user: CustomUser;
    publishers: Publisher[];
  
    constructor(id: number, user: CustomUser, publishers: Publisher[]) {
      this.id = id;
      this.user = user;
      this.publishers = publishers;
    }
  
    getName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
  }