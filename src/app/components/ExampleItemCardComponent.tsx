import React from 'react';
import './item.css'; // Assurez-vous d'importer le fichier CSS
import { Shirt } from '../classes/ShirtItem';
import Image from 'next/image';

const ExampleItemCardComponent: React.FC = () => {
    const shirt = new Shirt(
      '1',
      'Cotton Shirt',
      25,
      'Shirts',
      'creator1',
      'shirt-image.jpg',
      'A comfortable cotton shirt.',
      ['shirt-image-1.jpg', 'shirt-image-2.jpg'],
      'M',
      ['Red', 'Blue', 'Green']
    );
  
    shirt.displayInfo();  // This uses the method from the abstract class
    console.log('Discount:', shirt.calculateDiscount());  // This uses the overridden method
  
    return (
      <div className="item">
        <Image src={shirt.image} alt={shirt.name} className="item-image" />
        <div className="item-details">
          <h2 className="item-name">{shirt.name}</h2>
          <p style={{ display: 'none' }} className="item-category">{shirt.category}</p>
          <p className="item-price">${shirt.price.toFixed(2)}</p>
          <p style={{ display: 'none' }} className="item-creator">Creator ID: {shirt.creatorId}</p>
        </div>
      </div>
    );
  };
  
  export default ExampleItemCardComponent;
  