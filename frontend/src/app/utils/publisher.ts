export class Publisher {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    website: string;
  
    constructor(id: number, name: string, address: string, city: string, country: string, website: string) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.city = city;
      this.country = country;
      this.website = website;
    }
  
    getLocation() {
      return `${this.city}, ${this.country}`;
    }
  }