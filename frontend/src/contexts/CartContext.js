import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('skystates_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart items before setting them
        const validItems = parsedCart.filter(item => {
          return item && item.name && item.price && !isNaN(parseFloat(item.price.toString().replace('$', '').replace(',', '')));
        });
        
        if (validItems.length !== parsedCart.length) {
          console.warn('Some invalid cart items were filtered out');
          // Update localStorage with valid items only
          if (validItems.length > 0) {
            localStorage.setItem('skystates_cart', JSON.stringify(validItems));
          } else {
            localStorage.removeItem('skystates_cart');
          }
        }
        
        setCartItems(validItems);
        setCartCount(validItems.length);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        // Clear corrupted cart data
        localStorage.removeItem('skystates_cart');
        setCartItems([]);
        setCartCount(0);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('skystates_cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('skystates_cart');
    }
    setCartCount(cartItems.length);
  }, [cartItems]);

  const addToCart = (program) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.name === program.name && item.type === program.type
    );

    if (existingItemIndex !== -1) {
      // Item already exists, show alert or update quantity
      alert('This course is already in your cart!');
      return false;
    }

    // Add new item to cart
    const newItem = {
      ...program,
      id: Date.now() + Math.random(), // Unique ID
      addedAt: new Date().toISOString()
    };

    setCartItems(prev => [...prev, newItem]);
    return true;
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Handle different price formats: $2999.00, 2999.00, 2999, etc.
      const priceStr = item.price.toString().replace('$', '').replace(',', '');
      const price = parseFloat(priceStr);
      
      // Validate price
      if (isNaN(price) || price < 0) {
        console.warn('Invalid price detected:', item.price, item.name);
        return total;
      }
      
      return total + price;
    }, 0);
  };

  const isInCart = (programName, programType) => {
    return cartItems.some(item => item.name === programName && item.type === programType);
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
