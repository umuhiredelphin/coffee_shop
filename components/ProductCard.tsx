
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group border border-black p-4 flex flex-col hover:bg-black hover:text-white transition-all duration-300">
      <div className="aspect-square overflow-hidden mb-4 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
        <span className="font-mono text-sm">${product.price.toFixed(2)}</span>
      </div>
      <p className="text-xs opacity-60 mb-6 flex-grow">{product.description}</p>
      <button 
        onClick={() => onAddToCart(product)}
        className="w-full py-3 border border-current uppercase text-xs font-black tracking-widest hover:invert transition-all active:scale-95"
      >
        Add to Order
      </button>
    </div>
  );
};
