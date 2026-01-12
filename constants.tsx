
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Obsidian Espresso',
    price: 4.50,
    category: 'coffee',
    description: 'Dark roast with notes of charcoal and dark chocolate.',
    image: 'https://picsum.photos/seed/coffee1/600/600?grayscale'
  },
  {
    id: '2',
    name: 'Alabaster Latte',
    price: 5.25,
    category: 'coffee',
    description: 'Silky smooth milk paired with our signature light roast.',
    image: 'https://picsum.photos/seed/latte/600/600?grayscale'
  },
  {
    id: '3',
    name: 'Midnight Matcha',
    price: 6.00,
    category: 'tea',
    description: 'Ceremonial grade matcha whisked to perfection.',
    image: 'https://picsum.photos/seed/tea1/600/600?grayscale'
  },
  {
    id: '4',
    name: 'White Peony Tea',
    price: 5.50,
    category: 'tea',
    description: 'Delicate white tea from the high mountains.',
    image: 'https://picsum.photos/seed/tea2/600/600?grayscale'
  },
  {
    id: '5',
    name: 'Artisan Sourdough',
    price: 9.00,
    category: 'food',
    description: '48-hour fermented loaf with a crisp, dark crust.',
    image: 'https://picsum.photos/seed/bread/600/600?grayscale'
  },
  {
    id: '6',
    name: 'Truffle Benedict',
    price: 18.00,
    category: 'food',
    description: 'Poached eggs, shaved truffles, monochrome hollandaise.',
    image: 'https://picsum.photos/seed/eggs/600/600?grayscale'
  },
  {
    id: '7',
    name: 'Organic Heirloom Beans',
    price: 12.00,
    category: 'grocery',
    description: 'Slow-grown, sun-dried heirloom varieties.',
    image: 'https://picsum.photos/seed/beans/600/600?grayscale'
  },
  {
    id: '8',
    name: 'Cold Pressed Olive Oil',
    price: 24.00,
    category: 'grocery',
    description: 'Estate bottled, ultra-low acidity, purely translucent.',
    image: 'https://picsum.photos/seed/oil/600/600?grayscale'
  }
];

export const ICONS = {
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
  )
};
