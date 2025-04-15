import { AbstractItem } from './AbstractItem';

export class PantItem extends AbstractItem {
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
    super(id, name, price, category, creatorId, image, description, size, colors, createdAt, secondaryImages);
  }

  
  displayPageItem(): void {
    throw new Error('Method not implemented.');
    }

  // Implement the abstract method from AbstractItem
  calculateDiscount(): number {
    return this.price; // * 0.1;  // Example: 10% discount
  }

  displaySizeInfo(): void {
    throw new Error('Method not implemented.');
}
displayColorsInfo(): void {
    throw new Error('Method not implemented.');
}
}