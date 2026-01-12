
import React from 'react';
import { ICONS } from '../constants';

interface NavbarProps {
  onCartToggle: () => void;
  onBookingToggle: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartToggle, onBookingToggle, cartCount }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black h-20 px-6 md:px-12 flex items-center justify-between transition-all">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black tracking-tighter uppercase">Monolith</h1>
        <div className="hidden md:flex gap-6 uppercase text-xs font-bold tracking-widest">
          <a href="#menu" className="hover:line-through transition-all">Menu</a>
          <a href="#about" className="hover:line-through transition-all">About</a>
          <button onClick={onBookingToggle} className="hover:line-through transition-all">Reservations</button>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onBookingToggle}
          className="hidden sm:flex items-center gap-2 border border-black px-4 py-2 uppercase text-[10px] font-black hover:bg-black hover:text-white transition-all"
        >
          <ICONS.Calendar />
          Book Table
        </button>
        
        <button 
          onClick={onCartToggle}
          className="relative p-2 hover:scale-110 transition-transform"
        >
          <ICONS.Cart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
