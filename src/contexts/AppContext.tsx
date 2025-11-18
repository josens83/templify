import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, User, Template } from '../types';
import type { Toast } from '../components/ToastContainer';
import { getItem, setItem, removeItem } from '../utils/storage';

interface AppContextType {
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

  // User
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast
  toasts: Toast[];
  showToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = getItem<CartItem[]>('cart');
    const savedWishlist = getItem<string[]>('wishlist');
    const savedRecentlyViewed = getItem<string[]>('recentlyViewed');
    const savedUser = getItem<User>('user');
    const savedDarkMode = getItem<boolean>('darkMode');

    if (savedCart) setCart(savedCart);
    if (savedWishlist) setWishlist(savedWishlist);
    if (savedRecentlyViewed) setRecentlyViewed(savedRecentlyViewed);
    if (savedUser) setUser(savedUser);
    if (savedDarkMode !== null) setDarkMode(savedDarkMode);
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

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setItem('darkMode', darkMode);
  }, [darkMode]);

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

  const login = (email: string, _password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: 'u1',
      name: '홍길동',
      email,
      avatar: 'https://i.pravatar.cc/150?img=30',
      role: 'buyer',
      level: 5,
      points: 1250,
      badges: [],
      purchasedTemplates: [],
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    setItem('user', mockUser);
  };

  const logout = () => {
    setUser(null);
    removeItem('user');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const showToast = (type: Toast['type'], message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, type, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value: AppContextType = {
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
    user,
    login,
    logout,
    isAuthenticated: !!user,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    toasts,
    showToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
