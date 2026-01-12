
export type Category = 'coffee' | 'tea' | 'food' | 'grocery';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Booking {
  date: string;
  time: string;
  guests: number;
  name: string;
  notes?: string;
}

export interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  activeCategory: Category | 'all';
  isBookingOpen: boolean;
}
