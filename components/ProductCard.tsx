
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 group-hover:text-[#7d5c4b] transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-6 flex-grow">{product.description}</p>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-3 bg-black text-white rounded-2xl font-bold text-sm hover:bg-[#7d5c4b] transition-all active:scale-95"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};
