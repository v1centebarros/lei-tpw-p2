export class User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    image: string;
    description: string;
  password: any;
    constructor(id: number, username: string, email: string, first_name: string, last_name: string, birth_date: string, image: string, description: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.birth_date = birth_date;
        this.image = image;
        this.description = description;
    }


    static getNullUser(): User {
        return new User(0,"","","","","","","");
    }

    avg_rating: number;
}