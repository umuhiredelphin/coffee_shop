
import React from 'react';
import { ICONS } from '../constants';
import { CartItem } from '../types';

interface CartPageProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onBackToMenu: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ items, onRemove, onUpdateQuantity, onBackToMenu }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 5.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#fcfaf8] pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={onBackToMenu}
            className="p-3 bg-white border border-gray-100 rounded-full hover:shadow-lg transition-all group"
          >
            <div className="rotate-180 group-hover:-translate-x-1 transition-transform">
              <ICONS.ArrowRight />
            </div>
          </button>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-black">Your Order</h1>
            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Review your selections</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-gray-100 shadow-sm">
            <div className="text-6xl mb-6 text-black">🛒</div>
            <h2 className="text-2xl font-bold mb-4 text-black">Your bag is empty</h2>
            <p className="text-gray-400 max-w-xs mx-auto mb-10 leading-relaxed">
              Looks like you haven't added any of our premium brews to your order yet.
            </p>
            {/* BUTTON IS RED */}
            <button 
              onClick={onBackToMenu}
              className="bg-[#991b1b] text-white px-10 py-4 rounded-full font-bold hover:bg-[#dc2626] transition-all"
            >
              Explore the Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row gap-6 border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">{item.category}</span>
                        <h3 className="text-xl font-bold mt-1 text-black">{item.name}</h3>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <ICONS.Close />
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-4 bg-[#fcfaf8] px-4 py-2 rounded-2xl border border-gray-100">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-black hover:text-gray-400 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold w-4 text-center text-black">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-black hover:text-gray-400 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-bold mb-1">Total</p>
                        <p className="text-xl font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-black text-white rounded-[2.5rem] p-10 sticky top-24 shadow-2xl overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white blur-[80px] opacity-10" />
                <h3 className="text-2xl font-bold mb-8">Summary</h3>
                
                <div className="space-y-6 text-sm font-medium border-b border-white/10 pb-8 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-10">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-extrabold text-white">${total.toFixed(2)}</span>
                </div>

                {/* CHECKOUT BUTTON IS RED */}
                <button className="w-full bg-[#991b1b] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#dc2626] active:scale-95 transition-all shadow-xl shadow-red-900/20">
                  Secure Checkout
                  <ICONS.ArrowRight />
                </button>
                
                <p className="text-[10px] text-center text-gray-500 mt-6 font-bold uppercase tracking-widest">
                  Secure Payment • SSL Encrypted
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
