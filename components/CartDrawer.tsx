
import React from 'react';
import { ICONS } from '../constants';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[150] pointer-events-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#fcfaf8] border-l border-gray-100 pointer-events-auto transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}>
        <div className="p-8 flex items-center justify-between border-b border-gray-100 bg-white">
          <h2 className="text-2xl font-bold tracking-tight text-black">Your Order</h2>
          <a href="#close" onClick={(e) => { e.preventDefault(); onClose(); }} className="p-2 hover:rotate-90 transition-transform text-gray-400 hover:text-black">
            <ICONS.Close />
          </a>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 italic text-black">
              <div className="text-4xl">☕</div>
              <p className="text-sm">The cart is currently empty...</p>
              <a href="#menu" onClick={onClose} className="text-xs font-bold uppercase underline">Start Shopping</a>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <a href={`#product-${item.id}`} className="block">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-gray-100 group-hover:brightness-90 transition-all" />
                </a>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-black">
                      <a href={`#product-${item.id}`} className="hover:text-black transition-colors">{item.name}</a>
                    </h4>
                    <a 
                      href="#remove" 
                      onClick={(e) => { e.preventDefault(); onRemove(item.id); }} 
                      className="text-[10px] font-bold text-gray-400 hover:text-red-600 transition-colors"
                    >
                      REMOVE
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 font-medium">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">-</button>
                    <span className="text-xs font-bold text-black">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-gray-100 bg-white space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
            <span className="text-2xl font-bold text-black">${total.toFixed(2)}</span>
          </div>
          {/* CHECKOUT BUTTON IS RED */}
          <a 
            href="#checkout"
            className={`w-full bg-[#991b1b] text-white py-5 rounded-2xl font-bold text-sm tracking-widest hover:bg-[#dc2626] transition-all active:scale-95 flex items-center justify-center gap-4 shadow-xl shadow-red-100 ${items.length === 0 ? 'opacity-20 pointer-events-none' : ''}`}
          >
            Checkout Now
            <ICONS.ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};
