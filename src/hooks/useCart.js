import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
    
    // Listen for storage changes (when cart is updated in other components)
    const handleStorageChange = () => {
      loadCartItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('fillesume_cart') || '[]');
    setCartItems(savedCart);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = (item) => {
    const existingCart = JSON.parse(localStorage.getItem('fillesume_cart') || '[]');
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.variantId === item.variantId);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += item.quantity;
    } else {
      existingCart.push(item);
    }
    
    localStorage.setItem('fillesume_cart', JSON.stringify(existingCart));
    setCartItems(existingCart);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (variantId, newQuantity) => {
    let updatedCart;
    
    if (newQuantity <= 0) {
      updatedCart = cartItems.filter(item => item.variantId !== variantId);
    } else {
      updatedCart = cartItems.map(item =>
        item.variantId === variantId ? { ...item, quantity: newQuantity } : item
      );
    }
    
    setCartItems(updatedCart);
    localStorage.setItem('fillesume_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (variantId) => {
    const updatedCart = cartItems.filter(item => item.variantId !== variantId);
    setCartItems(updatedCart);
    localStorage.setItem('fillesume_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('fillesume_cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return {
    cartItems,
    getTotalItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart
  };
};
