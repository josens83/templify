/**
 * CartContext
 * 장바구니 및 위시리스트 관련 상태 및 로직 관리
 */

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, Template } from '../types';
import { getItem, setItem } from '../utils/storage';

interface CartContextType {
  // Cart
  cart: CartItem[];
  addToCart: (template: Template) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // Wishlist
  wishlist: string[];
  addToWishlist: (templateId: string) => void;
  removeFromWishlist: (templateId: string) => void;
  isInWishlist: (templateId: string) => boolean;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (templateId: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = getItem<CartItem[]>('cart');
    const savedWishlist = getItem<string[]>('wishlist');
    const savedRecentlyViewed = getItem<string[]>('recentlyViewed');

    if (savedCart) setCart(savedCart);
    if (savedWishlist) setWishlist(savedWishlist);
    if (savedRecentlyViewed) setRecentlyViewed(savedRecentlyViewed);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    setItem('cart', cart);
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    setItem('wishlist', wishlist);
  }, [wishlist]);

  // Save recently viewed to localStorage
  useEffect(() => {
    setItem('recentlyViewed', recentlyViewed);
  }, [recentlyViewed]);

  const addToCart = (template: Template) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.templateId === template.id);
      if (exists) {
        return prev.map((item) =>
          item.templateId === template.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { templateId: template.id, template, quantity: 1 }];
    });
  };

  const removeFromCart = (templateId: string) => {
    setCart((prev) => prev.filter((item) => item.templateId !== templateId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.template.price * item.quantity,
    0
  );

  const addToWishlist = (templateId: string) => {
    setWishlist((prev) => {
      if (prev.includes(templateId)) {
        return prev;
      }
      return [...prev, templateId];
    });
  };

  const removeFromWishlist = (templateId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== templateId));
  };

  const isInWishlist = (templateId: string) => {
    return wishlist.includes(templateId);
  };

  const addToRecentlyViewed = (templateId: string) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((id) => id !== templateId);
      // Add to beginning, keep max 10
      return [templateId, ...filtered].slice(0, 10);
    });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    recentlyViewed,
    addToRecentlyViewed,
    searchQuery,
    setSearchQuery,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
