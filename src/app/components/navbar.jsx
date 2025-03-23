"use client";
import Link from "next/link";
import { ShoppingBasket, X, Check, Menu } from "lucide-react";
import { useUser } from "../../context/user-context";
import { useCart } from "../../context/cart-context";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleHamburgerClick = () => {
    console.log("Hamburger clicked, current state:", mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const triggerCartUpdate = () => {
    fetchCartItems();
  };

  const CartNotification = () => {
    if (!showAddedNotification || !recentlyAdded) return null;
    
    return (
      <div className="absolute top-full right-0 mt-2 w-72 bg-[#252530] rounded-lg shadow-lg border border-[#3A3A4A] z-50 overflow-hidden animate-slideDown">
        {/* Cart notification content */}
      </div>
    );
  };

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

      {/* Mobile menu button */}
      <div className="hidden max-sm:block relative">
        <button 
          onClick={handleHamburgerClick}
          className="p-2 text-white hover:text-[#fa9a00ef]"
        >
          <Menu size={24} />
        </button>
        
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 bg-gray-950 rounded shadow-lg border border-gray-800 w-48 z-50">
            <ul className="py-2">
              <li>
                <Link href="/shop" className="block px-4 py-2 hover:bg-gray-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-800">
                  About Us
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-800">
                      Profile
                    </Link>
                  </li>
                  {user.user?.role === "ADMIN" && (
                    <li>
                      <Link href="/admin" className="block px-4 py-2 hover:bg-gray-800">
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <Link href="/login" className="block px-4 py-2 hover:bg-gray-800">
                    Login/Sign up
                  </Link>
                </li>
              )}
              <li>
                <Link href="/basket" className="block px-4 py-2 hover:bg-gray-800">
                  Cart ({cartItemCount})
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Desktop menu */}
      <ul className="max-sm:hidden flex space-x-12 font-bold">
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
        {user ? (
          <>
            <li className="flex items-center">
              <Link href="/profile" className="hover:text-[#fa9a00ef] transition-all">
                Profile
              </Link>
            </li>
            {user.user?.role === "ADMIN" && (
              <li className="flex items-center">
                <Link href="/admin" className="hover:text-[#fa9a00ef] transition-all">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </>
        ) : (
          <li className="flex items-center">
            <Link href="/login" className="hover:text-[#fa9a00ef] transition-all">
              Login/Sign up
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
}