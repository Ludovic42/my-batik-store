import { AbstractItem } from './AbstractItem';

export class TableclothItem extends AbstractItem {
  
  //length: string;  // Example: "120cm" in size
  //width: string;   // Example: "90cm"

  constructor(id: string, name: string, price: number, category: string, creatorId: string, image: string, description: string, size: string[], colors: string[], secondaryImages: string[]) {
    super(id, name, price, category, creatorId, image, description, size, colors, secondaryImages);
  }

  calculateDiscount(): number {
    throw new Error('Method not implemented.');
    }
    displayPageItem(): void {
        throw new Error('Method not implemented.');
    }
    displaySizeInfo(): void {
        throw new Error('Method not implemented.');
    }
    
displayColorsInfo(): void {
    throw new Error('Method not implemented.');
}
}