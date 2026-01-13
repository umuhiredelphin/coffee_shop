
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
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-100 pointer-events-auto transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}>
        <div className="p-8 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-2xl font-bold tracking-tight text-[#7d5c4b]">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform text-gray-400 hover:text-black">
            <ICONS.Close />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 italic">
              <div className="text-4xl">☕</div>
              <p className="text-sm">The cart is currently empty...</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-gray-100" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-[10px] font-bold text-gray-400 hover:text-red-500 transition-colors">REMOVE</button>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-gray-100 bg-gray-50 space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Subtotal</span>
            <span className="text-2xl font-bold text-[#7d5c4b]">${total.toFixed(2)}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full bg-[#7d5c4b] text-white py-5 rounded-2xl font-bold text-sm tracking-widest hover:brightness-110 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 shadow-xl shadow-brown-100"
          >
            Checkout Now
            <ICONS.ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
