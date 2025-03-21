"use client";
import Link from "next/link";
import { ShoppingBasket, X, Check } from "lucide-react";
import { useUser } from "../../context/user-context";
import { useCart } from "../../context/cart-context";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useUser();
  const { 
    cart, 
    showAddedNotification, 
    recentlyAdded, 
    hideAddedNotification 
  } = useCart();
  
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = () => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItemCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }
  };

  useEffect(() => {
    fetchCartItems();

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        fetchCartItems();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const intervalId = setInterval(() => {
      fetchCartItems();
    }, 1000);

    window.addEventListener("cartUpdated", fetchCartItems);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", fetchCartItems);
      clearInterval(intervalId);
    };
  }, []);

  const triggerCartUpdate = () => {
    fetchCartItems();
  };

  const CartNotification = () => {
    if (!showAddedNotification || !recentlyAdded) return null;
    
    return (
      <div className="absolute top-full right-0 mt-2 w-72 bg-[#252530] rounded-lg shadow-lg border border-[#3A3A4A] z-50 overflow-hidden animate-slideDown">
        <div className="flex justify-between items-center p-3 bg-[#1A1A22] border-b border-[#3A3A4A]">
          <div className="flex items-center">
            <Check size={16} className="text-[#FFA800] mr-2" />
            <p className="font-medium text-white">Added to Cart</p>
          </div>
          <button 
            onClick={hideAddedNotification}
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="p-4 flex gap-3">
          <div className="w-16 h-16 rounded overflow-hidden bg-[#1A1A22]">
            <img 
              src={recentlyAdded.img || "/placeholder.svg"} 
              alt={recentlyAdded.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <p className="font-medium truncate text-white">{recentlyAdded.title}</p>
            <p className="text-[#FFA800] font-medium mt-1">
              ${parseFloat(recentlyAdded.price).toFixed(2)} x {recentlyAdded.quantity}
            </p>
          </div>
        </div>
        
        <div className="p-3 flex justify-between border-t border-[#3A3A4A] bg-[#1A1A22]">
          <Link href="/shop">
            <button className="text-[#FFA800] hover:text-[#FF7A00] text-sm font-medium">
              Continue Shopping
            </button>
          </Link>
          <Link href="/basket">
            <button className="bg-[#FFA800] hover:bg-[#FF7A00] text-black px-4 py-1 rounded-full text-sm font-medium">
              View Cart
            </button>
          </Link>
        </div>
      </div>
    );
  };

  if (user) {
    return (
      <nav className="top-0 left-0 w-full z-10 flex justify-between items-center pr-10 bg-gray-950 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-[#fa9a00ef] transition-all">
            <div className="flex items-center space-x-2">
              <img src="/logo-white.png" alt="logo" className="w-16 h-16" />
              <span className="text-2xl font-bold">GAME VAULT</span>
            </div>
          </Link>
        </div>

        <ul className="flex space-x-12 font-bold">
          <li className="flex items-center">
            <Link href="/shop" className="hover:text-[#fa9a00ef] transition-all">
              Shop
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/about" className="hover:text-[#fa9a00ef] transition-all">
              About Us
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/profile" className="hover:text-[#fa9a00ef] transition-all">
              Profile
            </Link>
          </li>

          {user.user.role === "ADMIN" && (
            <li className="flex items-center">
              <Link href="/admin" className="hover:text-[#fa9a00ef] transition-all">
                Admin Dashboard
              </Link>
            </li>
          )}

          <li className="flex items-center relative">
            <Link
              href="/basket"
              className="hover:text-[#fa9a00ef] transition-all flex items-center space-x-1"
              onClick={triggerCartUpdate}
            >
              <ShoppingBasket size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md border border-gray-900">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            
            <CartNotification />
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="top-0 left-0 w-full z-10 flex justify-between items-center p-1 pr-10 bg-gray-950 text-white font-bold">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-[#fa9a00ef] transition-all">
            <div className="flex items-center space-x-2">
              <img src="/logo-white.png" alt="logo" className="w-16 h-16" />
              <span className="text-2xl font-bold">GAME VAULT</span>
            </div>
          </Link>
        </div>

        <ul className="flex space-x-12">
          <li className="flex items-center">
            <Link href="/shop" className="hover:text-[#fa9a00ef] transition-all">
              Shop
            </Link>
          </li>

          <li className="flex items-center">
            <Link href="/login" className="hover:text-[#fa9a00ef] transition-all">
              Login/Sign up
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/about" className="hover:text-[#fa9a00ef] transition-all">
              About Us
            </Link>
          </li>

          <li className="flex items-center relative">
            <Link
              href="/basket"
              className="hover:text-[#fa9a00ef] transition-all flex items-center space-x-1"
              onClick={triggerCartUpdate}
            >
              <ShoppingBasket size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md border border-gray-900">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            
            <CartNotification />
          </li>
        </ul>
      </nav>
    );
  }
}