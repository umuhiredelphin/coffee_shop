
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
    <div className={`fixed inset-0 z-[110] pointer-events-none transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-auto transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-red-600 pointer-events-auto transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-2xl`}>
        <div className="p-8 flex items-center justify-between border-b border-red-600">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-red-600">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform text-red-600">
            <ICONS.Close />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 italic text-red-600">
              <p className="text-sm">The cart is an empty void...</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover grayscale border border-red-600" />
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-sm uppercase text-red-600">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-[10px] font-black underline hover:no-underline text-red-600">Remove</button>
                  </div>
                  <p className="text-xs opacity-50 mb-4 text-red-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 border border-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white text-red-600">-</button>
                    <span className="text-xs font-bold text-red-600">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 border border-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white text-red-600">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-red-600 bg-red-50 space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Subtotal</span>
            <span className="text-2xl font-black text-red-600">${total.toFixed(2)}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full bg-red-600 text-white py-5 uppercase font-black text-sm tracking-[0.3em] hover:bg-red-700 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-4 shadow-lg shadow-red-200"
          >
            Checkout Now
            <ICONS.ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
