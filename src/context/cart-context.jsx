'use client' 

import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })
  
  const [showAddedNotification, setShowAddedNotification] = useState(false)
  const [recentlyAdded, setRecentlyAdded] = useState(null)
  const [notificationTimeout, setNotificationTimeout] = useState(null)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }, [cart])

  const addToCart = (item) => {
    let updatedItem = {...item};
    let isExistingItem = false;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        isExistingItem = true;
        updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity
        };
        
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? updatedItem
            : cartItem
        );
      }
      return [...prevCart, { ...item }];
    })
    
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
    }
    
    if (showAddedNotification && recentlyAdded && recentlyAdded.id === item.id) {
      setRecentlyAdded(updatedItem);
    } else {
      setRecentlyAdded(updatedItem);
      setShowAddedNotification(true);
    }
    
    const timeoutId = setTimeout(() => {
      setShowAddedNotification(false);
    }, 5000);
    
    setNotificationTimeout(timeoutId);
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
    
    if (recentlyAdded && recentlyAdded.id === id) {
      setShowAddedNotification(false);
    }
  }

  const updateQuantity = (id, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart
        .map(item => item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)
        .filter(item => item.quantity > 0);
      
      if (recentlyAdded && recentlyAdded.id === id) {
        const updatedItem = updatedCart.find(item => item.id === id);
        if (updatedItem) {
          setRecentlyAdded(updatedItem);
        } else {
          setShowAddedNotification(false);
        }
      }
      
      return updatedCart;
    });
  }

  const clearCart = () => {
    setCart([]);
    setShowAddedNotification(false);
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }
  
  const hideAddedNotification = () => {
    setShowAddedNotification(false);
    if (notificationTimeout) {
      clearTimeout(notificationTimeout);
      setNotificationTimeout(null);
    }
  }

  useEffect(() => {
    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [notificationTimeout]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal,
      showAddedNotification,
      recentlyAdded,
      hideAddedNotification
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}