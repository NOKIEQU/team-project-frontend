"use client";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useUser } from "../../context/user-context";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useUser();
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

          <li className="flex items-center">
            <button
              onClick={logout}
              className="hover:text-[#fa9a00ef] transition-all"
            >
              Logout
            </button>
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
          </li>
        </ul>
      </nav>
    );
  }
}