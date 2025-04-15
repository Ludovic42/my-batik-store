import { Creator, ItemImage, Review } from '../models';
import { Item } from '../models/Item';

export abstract class AbstractItem implements Item {
    id: string;
    name: string;
    price: number;
    category: string;
    creatorId: string;
    image: string;
    description: string;
    size: string;
    colors: string[];
    createdAt: Date;
    secondaryImages: string[];
  
    constructor(
      id: string,
      name: string,
      price: number,
      category: string,
      creatorId: string,
      image: string,
      description: string,
      size: string,
      colors: string[],
      createdAt: Date,
      secondaryImages: string[]
    ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.creatorId = creatorId;
      this.image = image;
      this.description = description;
      this.size = size;
      this.colors = colors;
      this.createdAt = createdAt;
      this.secondaryImages = secondaryImages;
    }
  creator?: Creator | undefined;
  widthCm?: number | undefined;
  heightCm?: number | undefined;
  mainImage?: string | undefined;
  images?: ItemImage[] | undefined;
  reviews?: Review[] | undefined;

    displayCardItem(): void {
        throw new Error('Method not implemented.');
    }
  
    // Example of a shared method
    displayInfo(): void {
      console.log(`Item: ${this.name}, Price: ${this.price}, Description: ${this.description}`);
    }
    // Abstract method: subclasses need to implement it
    abstract calculateDiscount(): number;
    abstract displayPageItem(): void;
    abstract displaySizeInfo(): void;
    abstract displayColorsInfo(): void;
  }