
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
      <a href={`#product-${product.id}`} className="aspect-square overflow-hidden relative block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* PRICE TAG IS BLACK */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-black">
          ${product.price.toFixed(2)}
        </div>
      </a>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-black transition-colors text-black">
            <a href={`#product-${product.id}`}>{product.name}</a>
          </h3>
        </div>
        <p className="text-sm text-gray-400 mb-6 flex-grow leading-relaxed">{product.description}</p>
        {/* ADD BUTTON IS RED */}
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-3 bg-[#991b1b] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#dc2626] transition-all active:scale-95"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};
