
import React, { useState, useEffect, useCallback } from 'react';
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
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Cart operations
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

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const fetchAiSuggestion = async () => {
    setIsAiLoading(true);
    const suggestion = await getAIAssistantResponse("Suggest a perfect breakfast pairing from the menu consisting of a coffee/tea and a food item.");
    setAiMessage(suggestion || "");
    setIsAiLoading(false);
  };

  useEffect(() => {
    fetchAiSuggestion();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar 
        onCartToggle={() => setIsCartOpen(true)} 
        onBookingToggle={() => setIsBookingOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
      />

      {/* Hero Section */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/monolith-bg/1920/1080?grayscale" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] mb-6 block animate-pulse">Since 1984 — Minimalist Living</span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            The Monolith<br/>Market
          </h1>
          <p className="text-sm md:text-lg max-w-2xl mx-auto opacity-70 mb-12 italic serif">
            "A curated experience of essential items, dark roasts, and brutalist architecture for the modern soul."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="bg-black text-white px-10 py-5 uppercase text-xs font-black tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-3">
              Explore Menu
              <ICONS.ArrowRight />
            </a>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="border border-black px-10 py-5 uppercase text-xs font-black tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Book Residency
            </button>
          </div>
        </div>
      </header>

      {/* AI Suggestion Bar */}
      {aiMessage && (
        <section className="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-y border-black">
          <div className="animate-[scroll_30s_linear_infinite] inline-block">
            <span className="mx-20 text-[10px] font-black uppercase tracking-[0.3em]">AI Concierge Suggestion: {aiMessage}</span>
            <span className="mx-20 text-[10px] font-black uppercase tracking-[0.3em]">AI Concierge Suggestion: {aiMessage}</span>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main id="menu" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Curated Selections</h2>
            <p className="text-xs opacity-50 uppercase tracking-widest max-w-md">Everything you need, nothing you don't. Pure monochrome quality.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 uppercase text-[10px] font-black tracking-widest overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
            {(['all', 'coffee', 'tea', 'food', 'grocery'] as const).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-1 border-b-2 transition-all ${activeCategory === cat ? 'border-black opacity-100' : 'border-transparent opacity-30 hover:opacity-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </main>

      {/* About / Secondary Section */}
      <section id="about" className="py-24 bg-neutral-50 border-y border-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="aspect-[4/5] bg-black overflow-hidden border border-black group">
            <img 
              src="https://picsum.photos/seed/store/800/1000?grayscale" 
              alt="The Monolith Space" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Our Philosophy</span>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">The Void In Everyday Life.</h2>
              <p className="serif text-xl opacity-80 leading-relaxed italic">
                "We believe that consumption should be an act of intention. By stripping away color, we invite you to focus on the texture, the aroma, and the soul of the product."
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-black pt-12">
              <div>
                <h4 className="text-[10px] font-black uppercase mb-4 tracking-widest">Global Sourcing</h4>
                <p className="text-xs opacity-60 leading-relaxed">Direct relationships with small estates across the monochrome belt.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase mb-4 tracking-widest">Hyper-Minimal</h4>
                <p className="text-xs opacity-60 leading-relaxed">Each item tested for 100+ hours to ensure absolute necessity.</p>
              </div>
            </div>

            <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] group">
              Read our full manifesto 
              <span className="group-hover:translate-x-2 transition-transform"><ICONS.ArrowRight /></span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 px-6 md:px-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">
          <div className="max-w-sm space-y-8">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Monolith</h2>
            <p className="text-xs opacity-50 leading-loose uppercase tracking-widest">
              123 Brutalist Ave.<br/>Concrete District<br/>Shadow Valley, SV 00000
            </p>
            <div className="flex gap-6 opacity-50 hover:opacity-100 transition-opacity">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest">Instagram</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest">Vimeo</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest">Newsletter</a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="space-y-4">
              <h5 className="text-neutral-500">Shop</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:line-through">Subscription</a></li>
                <li><a href="#" className="hover:line-through">Bulk Order</a></li>
                <li><a href="#" className="hover:line-through">Gift Cards</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="text-neutral-500">Support</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:line-through">Track Order</a></li>
                <li><a href="#" className="hover:line-through">Shipping</a></li>
                <li><a href="#" className="hover:line-through">Returns</a></li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h5 className="text-neutral-500">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:line-through">Privacy Policy</a></li>
                <li><a href="#" className="hover:line-through">Terms of Use</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-12 -right-12 text-[15vw] font-black text-white/[0.03] pointer-events-none select-none uppercase tracking-tighter">
          Monolith
        </div>
      </footer>

      {/* Overlays */}
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

      {/* Global CSS for marquee */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;
