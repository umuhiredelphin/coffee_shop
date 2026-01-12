
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
      const msg = await getAIAssistantResponse("Welcome message for F&F Coffee Shop customers.");
      setAiMessage(msg || '');
    };
    fetchAi();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onCartToggle={() => setIsCartOpen(true)} 
        onBookingToggle={() => setIsBookingOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* Hero Section - Matching Screenshot */}
      <header className="hero-gradient h-[75vh] flex flex-col items-center justify-center text-center px-4 pt-16">
        <h1 className="text-white text-5xl md:text-8xl font-extrabold mb-4 tracking-tight uppercase">
          F&F COFFEE SHOP
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-xl">
          Discover perfect blend of taste and aroma
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-gray-100 transition-all active:scale-95"
          >
            <ICONS.Calendar />
            Book a Table
          </button>
          <a 
            href="#menu"
            className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all active:scale-95"
          >
            View Menu
          </a>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative">
          <input 
            type="text"
            placeholder="Search for your favorite coffee..."
            className="w-full h-14 pl-6 pr-16 rounded-full bg-white shadow-2xl focus:outline-none text-black font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#7d5c4b] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md hover:brightness-110 transition-all">
            <ICONS.Search />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main id="menu" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl font-bold">Our Menu</h2>
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-full">
            {(['all', 'coffee', 'tea', 'food', 'grocery'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${activeCategory === cat ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No products found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-6 md:px-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold">F&F COFFEE SHOP</h3>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Serving the finest beans since 1984. Our dedication to aroma and taste is what makes us special. Join our community and experience the ritual.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Contact</h4>
            <p className="text-sm text-gray-400">123 Brew Lane, Coffee City</p>
            <p className="text-sm text-gray-400">info@ffcoffee.com</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Follow Us</h4>
            <div className="flex gap-4">
              <span className="text-sm text-gray-400 cursor-pointer hover:text-white">Instagram</span>
              <span className="text-sm text-gray-400 cursor-pointer hover:text-white">Twitter</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (Cart) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#7d5c4b] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <ICONS.Cart />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
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
    </div>
  );
};

export default App;
