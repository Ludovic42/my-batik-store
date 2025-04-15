// src/components/Shirt.tsx
import React from 'react';
import { ShirtItem } from '../classes/ShirtItem';  // Import the Shirt class
import Image from 'next/image';

const ShirtPageComponent: React.FC<ShirtItem> = ({ name, price, image, description, secondaryImages, size, colors }) => {
  return (
    <div className="item shirt">
      <Image src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <p>Size: {size}</p>
      <p>Colors: {colors.join(', ')}</p>
      <div className="secondary-images">
        {secondaryImages.map((image, index) => (
          <Image key={index} src={image} alt={`secondary-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ShirtPageComponent;
