import { Item } from '../interfaces/Item';

export abstract class AbstractItem implements Item {
    id: string;
    name: string;
    price: number;
    category: string;
    creatorId: string;
    image: string;
    description: string;
    secondaryImages: string[];
  
    constructor(
      id: string,
      name: string,
      price: number,
      category: string,
      creatorId: string,
      image: string,
      description: string,
      secondaryImages: string[]
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.creatorId = creatorId;
      this.image = image;
      this.description = description;
      this.secondaryImages = secondaryImages;
    }
    displayCardItem(): void {
        throw new Error('Method not implemented.');
    }
  
    // Example of a shared method
    displayInfo(): void {
      console.log(`Item: ${this.name}, Price: ${this.price}, Description: ${this.description}`);
    }

    abstract displaySizeInfo(): void;
  
    // Abstract method: subclasses need to implement it
    abstract calculateDiscount(): number;
    abstract displayPageInfo(): void;
  }