import React from 'react';
import './item.css'; // Assurez-vous d'importer le fichier CSS
import { AbstractItem } from '../classes/AbstractItem';
import Image from 'next/image';

const ItemCardComponent: React.FC<AbstractItem> = ({ image, price, name, category, creatorId }) => {
  return (
    <div className="item">
      <Image src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h2 className="item-name">{name}</h2>
        <p style={{ display: 'none' }} className="item-category">{category}</p>
        <p className="item-price">${price.toFixed(2)}</p>
        <p style={{ display: 'none' }} className="item-creator">Creator ID: {creatorId}</p>
      </div>
    </div>
  );
};

export default ItemCardComponent;