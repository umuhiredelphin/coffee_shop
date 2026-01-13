
import React from 'react';
import { ICONS, PRODUCTS } from '../constants';
import { Product } from '../types';

interface OrderConfirmationPageProps {
  product: Product | null;
  onContinueShopping: () => void;
  onViewCart: () => void;
  onAddToCart: (product: Product) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ 
  product, 
  onContinueShopping, 
  onViewCart,
  onAddToCart
}) => {
  if (!product) return null;

  // Simple logic to suggest other items from a different category
  const suggestions = PRODUCTS
    .filter(p => p.id !== product.id && p.category !== product.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fcfaf8] animate-fade-in pb-24">
      {/* Top Banner */}
      <div className="bg-black text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#991b1b] rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#991b1b] rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-[#991b1b] text-white rounded-full flex items-center justify-center mb-6 text-4xl shadow-2xl shadow-red-900/50 scale-in">
            ✓
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Added to Order!</h1>
          <p className="text-gray-400 max-w-md mx-auto font-medium">Your selection has been successfully added to your bag.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        {/* Added Product Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-10 mb-16 animate-slide-up">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-lg shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block">{product.category}</span>
            <h2 className="text-3xl font-bold mb-4 text-black">{product.name}</h2>
            <p className="text-gray-500 mb-8 leading-relaxed line-clamp-2">{product.description}</p>
            <div className="text-2xl font-black text-black mb-8">${product.price.toFixed(2)}</div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onViewCart}
                className="bg-[#991b1b] text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#dc2626] transition-all active:scale-95 shadow-xl shadow-red-900/10"
              >
                Go to Bag
                <ICONS.ArrowRight />
              </button>
              <button 
                onClick={onContinueShopping}
                className="bg-white text-black border-2 border-black/10 px-10 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Perfect Pairings Section */}
        <div>
          <h3 className="text-xl font-bold mb-8 text-black flex items-center gap-3">
            Perfect Pairings
            <div className="h-px flex-grow bg-black/5"></div>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {suggestions.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-50 shadow-sm hover:shadow-md transition-all group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* RED BUTTON for Pairing */}
                    <button 
                      onClick={() => onAddToCart(item)}
                      className="bg-[#991b1b] text-white p-3 rounded-full shadow-lg hover:bg-[#dc2626] hover:scale-110 active:scale-95 transition-all"
                    >
                      <ICONS.Cart />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-sm mb-1 truncate text-black">{item.name}</h4>
                <div className="text-xs font-bold text-gray-400">${item.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
