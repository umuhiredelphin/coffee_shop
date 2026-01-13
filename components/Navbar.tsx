
import React from 'react';
import { ICONS } from '../constants';

interface NavbarProps {
  onCartToggle: () => void;
  onBookingToggle: () => void;
  onHomeClick: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartToggle, onBookingToggle, onHomeClick, cartCount }) => {
  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 w-[98%] max-w-[1400px] z-[100] bg-black text-white rounded-xl shadow-xl h-14 px-4 flex items-center justify-between transition-all border border-white/10">
      {/* Left side: User and Grid */}
      <div className="flex items-center gap-1 sm:gap-3">
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center" title="Profile">
          <ICONS.User />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center" title="Services">
          <ICONS.Grid />
        </button>
      </div>

      {/* Middle side: Navigation Links */}
      <div className="hidden lg:flex items-center gap-6">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
        >
          <ICONS.Home /> <span>Home</span>
        </button>
        <a href="#menu" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          <ICONS.Menu /> <span>Menu</span>
        </a>
        <button 
          onClick={(e) => { e.preventDefault(); onBookingToggle(); }} 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors"
        >
          <ICONS.Calendar /> <span>Book Table</span>
        </button>
        <a href="#about" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          <ICONS.About /> <span>About</span>
        </a>
        <a href="#help" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-gray-400 transition-colors">
          <ICONS.Help /> <span>Help</span>
        </a>
      </div>
      
      {/* Right side: Action Icons */}
      <div className="flex items-center gap-1 sm:gap-3">
        <button 
          onClick={onCartToggle}
          className="relative p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
          title="Cart"
        >
          <ICONS.Cart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-black">
              {cartCount}
            </span>
          )}
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center" title="Track Orders">
          <ICONS.Package />
        </button>
        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center" title="Notifications">
          <ICONS.Bell />
        </button>
      </div>
    </nav>
  );
};
