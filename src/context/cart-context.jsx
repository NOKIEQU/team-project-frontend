'use client' 

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './user-context'

const API_BASE_URL = 'http://51.77.110.253:3001/api';

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const { user } = useUser(); 
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const makeApiCall = async (endpoint, method = 'GET', body = null) => {
    if (!user || !user.token) return null;
    
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      }
    };
    
    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`API call failed: ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error(`Error in API call to ${endpoint}:`, err);
      throw err;
    }
  };

  useEffect(() => {
    const fetchCartFromBackend = async () => {
      if (!user || !user.user.id || !user.token) return;
      
      try {
        setIsLoading(true);
        const data = await makeApiCall('/cart');
        
        async function fetchProductImage(productId) {
          try {
            const product = await makeApiCall(`/products/${productId}`);
            console.log('Product:', product.imageUrls[0]);
            return product.imageUrls[0]

          } catch (err) {
            console.error('Error fetching product image:', err);
            return { img: null };
          }
        }

        
        if (data && data.cartItems) {
          // Transform backend cart items to match frontend structure
          const transformedItems = data.cartItems.map(item => ({
            id: item.product.id,
            title: item.product.title,
            price: parseFloat(item.product.price),
            quantity: item.quantity,
            img: item.product.imageUrls[0] || null
          }));
          
          setCart(transformedItems);
          localStorage.setItem('cart', JSON.stringify(transformedItems));
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartFromBackend();
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cartUpdated'))
    }
  }, [cart])

  const addToCart = async (item) => {
    let updatedItem = {...item};
    let isExistingItem = false;
    
    // Update local state first for immediate feedback
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
    
    // Then sync with backend if user is logged in
    if (user && user.user.id && user.token) {
      try {
        await makeApiCall('/cart/items', 'POST', {
          productId: item.id,
          quantity: item.quantity
        });
      } catch (err) {
        setError(err.message);
      }
    }
    
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

  const removeFromCart = async (id) => {
    let cartItemId = null;
    if (user && user.user.id) {
      try {
        const data = await makeApiCall('/cart');
        const cartItem = data.cartItems.find(item => item.productId === id);
        if (cartItem) cartItemId = cartItem.id;
      } catch (err) {
        console.error('Error fetching cart item ID:', err);
      }
    }

    setCart(prevCart => prevCart.filter(item => item.id !== id))
    
    if (user && user.user.id && user.token && cartItemId) {
      try {
        await makeApiCall(`/cart/items/${cartItemId}`, 'DELETE');
      } catch (err) {
        setError(err.message);
      }
    }
    
    if (recentlyAdded && recentlyAdded.id === id) {
      setShowAddedNotification(false);
    }
  }

  const updateQuantity = async (id, quantity) => {
    let cartItemId = null;
    if (user && user.user.id) {
      try {
        const data = await makeApiCall('/cart');
        const cartItem = data.cartItems.find(item => item.productId === id);
        if (cartItem) cartItemId = cartItem.id;
      } catch (err) {
        console.error('Error fetching cart item ID:', err);
      }
    }

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
    
    if (user && user.user.id && user.token && cartItemId && quantity > 0) {
      try {
        console.log('Updating quantity:', cartItemId, quantity);
        await makeApiCall(`/cart/items/${cartItemId}`, 'PATCH', { "quantity": quantity });
        console.log('Quantity updated!');
      } catch (err) {
        setError(err.message);
      }
    } else if (user && user.user.id && user.token && cartItemId && quantity <= 0) {
      try {
        await makeApiCall(`/cart/items/${cartItemId}`, 'DELETE');
      } catch (err) {
        setError(err.message);
      }
    }
  }

  const clearCart = async () => {
    setCart([]);
    setShowAddedNotification(false);
    
    if (user && user.user.id && user.token) {
      try {
        const data = await makeApiCall('/cart');
        
        if (data && data.cartItems) {
          for (const item of data.cartItems) {
            await makeApiCall(`/cart/items/${item.id}`, 'DELETE');
          }
        }
      } catch (err) {
        console.error('Error clearing cart on server:', err);
        setError(err.message);
      }
    }
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
      hideAddedNotification,
      isLoading,
      error
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