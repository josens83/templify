import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, User, Template } from '../types';

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (template: Template) => void;
  removeFromCart: (templateId: string) => void;
  clearCart: () => void;
  cartTotal: number;

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
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
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
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const value: AppContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    user,
    login,
    logout,
    isAuthenticated: !!user,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
