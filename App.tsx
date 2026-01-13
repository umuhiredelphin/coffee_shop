
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS, ICONS } from './constants';
import { Product, CartItem, Category } from './types';
import { getAIAssistantResponse } from './services/geminiService';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiMessage, setAiMessage] = useState<string>('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const fetchAi = async () => {
      const msg = await getAIAssistantResponse("A quick, elegant welcome message for a high-end coffee shop customer.");
      setAiMessage(msg || 'Welcome to F&F. The perfect blend awaits.');
    };
    fetchAi();
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-[#7d5c4b] selection:text-white">
      <Navbar 
        onCartToggle={() => setIsCartOpen(true)} 
        onBookingToggle={() => setIsBookingOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* Hero Section */}
      <header className="hero-gradient h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="animate-fade-in space-y-4">
          <h1 className="text-white text-6xl md:text-9xl font-extrabold mb-4 tracking-tighter uppercase leading-none">
            F&F <br className="md:hidden" /> COFFEE
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto italic">
            "Discover the perfect blend of taste and aroma"
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-black px-10 py-4 rounded-full font-bold flex items-center gap-3 shadow-2xl hover:bg-gray-100 transition-all active:scale-95"
            >
              <ICONS.Table />
              Book a Table
            </button>
            <a 
              href="#menu"
              className="bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all active:scale-95"
            >
              Explore Menu
            </a>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl relative mx-auto group">
            <input 
              type="text"
              placeholder="Search for your favorite brew..."
              className="w-full h-16 pl-8 pr-20 rounded-full bg-white/95 shadow-2xl focus:outline-none text-black font-medium text-lg focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#7d5c4b] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
              <ICONS.Search />
            </button>
          </div>
        </div>
      </header>

      {/* AI Message Bar */}
      {aiMessage && (
        <div className="bg-[#7d5c4b] text-white py-3 overflow-hidden whitespace-nowrap">
          <div className="animate-[scroll_40s_linear_infinite] inline-block">
            <span className="mx-20 text-xs font-bold uppercase tracking-widest">{aiMessage} — Order now for fresh delivery</span>
            <span className="mx-20 text-xs font-bold uppercase tracking-widest">{aiMessage} — Order now for fresh delivery</span>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <main id="menu" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-[#7d5c4b] text-xs font-black uppercase tracking-[0.4em]">Our Selections</span>
            <h2 className="text-5xl font-extrabold tracking-tight">The Brew Menu</h2>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-3xl">
            {(['all', 'coffee', 'tea', 'food', 'grocery'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-[#7d5c4b] shadow-sm' : 'text-gray-400 hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400 font-medium">We couldn't find any products matching "{searchQuery}"</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-[#7d5c4b] font-bold underline">Clear search</button>
          </div>
        )}
      </main>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2070&auto=format&fit=crop" 
                alt="Coffee Roasting" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#7d5c4b] rounded-[3rem] p-10 flex flex-col justify-end hidden md:flex">
              <span className="text-4xl font-bold mb-2">35+</span>
              <p className="text-xs uppercase font-bold tracking-widest opacity-70">Years of Brewing Excellence</p>
            </div>
          </div>
          <div className="space-y-10">
            <div className="space-y-6">
              <span className="text-[#7d5c4b] text-xs font-black uppercase tracking-[0.4em]">Our Story</span>
              <h2 className="text-6xl font-extrabold tracking-tighter leading-tight">Crafted with Heart, Roasted with Soul.</h2>
              <p className="text-gray-400 leading-loose text-lg italic serif">
                "F&F Coffee Shop began as a small stand in the Concrete District. Today, we bring the same passion for the perfect roast to every cup, ensuring every customer finds their unique blend."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#7d5c4b] rounded-full flex items-center justify-center">✨</div>
                <h4 className="font-bold">Organic Beans</h4>
                <p className="text-xs text-gray-500">Sourced directly from sustainable small-batch farmers.</p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-[#7d5c4b] rounded-full flex items-center justify-center">🏆</div>
                <h4 className="font-bold">Award Winning</h4>
                <p className="text-xs text-gray-500">Voted best local espresso for three consecutive years.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 rounded-[3rem] overflow-hidden h-[400px] bg-gray-100 border-4 border-white shadow-2xl">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Location" />
        </div>
        <div className="bg-gray-50 p-12 rounded-[3rem] flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-bold">Visit Us</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-[#7d5c4b]">📍</div>
              <div>
                <h5 className="font-bold text-sm">Location</h5>
                <p className="text-sm text-gray-500">123 Brew Lane, Coffee City</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-[#7d5c4b]">⏰</div>
              <div>
                <h5 className="font-bold text-sm">Hours</h5>
                <p className="text-sm text-gray-500">Mon - Fri: 7am - 9pm</p>
                <p className="text-sm text-gray-500">Sat - Sun: 8am - 10pm</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsBookingOpen(true)} className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-[#7d5c4b] transition-all">Get Directions</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-sm space-y-8">
            <h2 className="text-4xl font-extrabold tracking-tighter uppercase">F&F COFFEE</h2>
            <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-widest">
              Crafting memories one cup at a time. Join the F&F community and experience the true ritual of coffee.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">In</a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">Tw</a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">Fb</a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-xs font-bold uppercase tracking-widest">
            <div className="space-y-4">
              <h5 className="text-[#7d5c4b]">Shop</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Whole Beans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Merchandise</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-[#7d5c4b]">Support</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Delivery FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wholesale</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 text-[10px] text-gray-600 font-bold uppercase tracking-[0.5em] text-center">
          © 2024 F&F COFFEE SHOP — ALL RIGHTS RESERVED
        </div>
      </footer>

      {/* Cart FAB */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 z-[100] bg-[#7d5c4b] text-white p-5 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all group"
      >
        <ICONS.Cart />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-4 border-white">
            {cart.reduce((s, i) => s + i.quantity, 0)}
          </span>
        )}
      </button>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
