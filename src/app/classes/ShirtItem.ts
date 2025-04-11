import { AbstractItem } from './AbstractItem';

export class ShirtItem extends AbstractItem {
  colors: string[];

  constructor(
    id: string,
    name: string,
    price: number,
    category: string,
    creatorId: string,
    image: string,
    description: string,
    size: number[],
    colors: string[],
    secondaryImages: string[]
  ) {
    super(id, name, price, category, creatorId, image, description, size, colors, secondaryImages);
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