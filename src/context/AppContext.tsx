import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, ProductColour } from '../types';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    size: string,
    colour: ProductColour,
    stitching: 'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched'
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, change: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistItemToCart: (
    product: Product,
    size: string,
    colour: ProductColour,
    stitching: 'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched'
  ) => void;
  user: User;
  loginUser: (name: string, email: string, companyName?: string, gstNumber?: string) => void;
  logoutUser: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  policyModalType: 'privacy' | 'terms' | 'shipping' | 'return' | 'refund' | null;
  setPolicyModalType: (type: 'privacy' | 'terms' | 'shipping' | 'return' | 'refund' | null) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('premium_textiles_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'light';
  });

  // Apply class to HTML tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('premium_textiles_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('premium_textiles_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('premium_textiles_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity: number,
    size: string,
    colour: ProductColour,
    stitching: 'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched'
  ) => {
    setCart((prevCart) => {
      // Create a unique composite key
      const id = `${product.id}_${size}_${colour.name.replace(/\s+/g, '')}_${stitching}`;
      const existingIndex = prevCart.findIndex((item) => item.id === id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id,
            product,
            quantity,
            selectedSize: size,
            selectedColour: colour,
            stitchingOption: stitching,
          },
        ];
      }
    });
    // Open cart drawer for premium immediate feedback
    setCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + change;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('premium_textiles_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('premium_textiles_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistItemToCart = (
    product: Product,
    size: string,
    colour: ProductColour,
    stitching: 'Unstitched' | 'Semi-Stitched' | 'Custom Boutique Stitched'
  ) => {
    // Add to cart
    addToCart(product, 1, size, colour, stitching);
    // Remove from wishlist
    toggleWishlist(product);
  };

  // User auth state
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('premium_textiles_user');
    return saved ? JSON.parse(saved) : { name: '', email: '', isLoggedIn: false };
  });

  const loginUser = (name: string, email: string, companyName?: string, gstNumber?: string) => {
    const newUser = { name, email, companyName, gstNumber, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('premium_textiles_user', JSON.stringify(newUser));
  };

  const logoutUser = () => {
    const loggedOutUser = { name: '', email: '', isLoggedIn: false };
    setUser(loggedOutUser);
    localStorage.removeItem('premium_textiles_user');
  };

  // Dialog and panel states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'terms' | 'shipping' | 'return' | 'refund' | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistItemToCart,
        user,
        loginUser,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        policyModalType,
        setPolicyModalType,
        cartDrawerOpen,
        setCartDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
