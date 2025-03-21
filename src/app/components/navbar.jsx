"use client";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useUser } from "../../context/user-context";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useUser();

  if (user) {
    return (
      <nav className=" top-0 left-0 w-full z-10 flex justify-between items-center pr-10 bg-gray-950 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-[#fa9a00ef] transition-all">
            <div className="flex items-center space-x-2">
              <img src="/logo-white.png" alt="logo" className="w-16 h-16" />
              <span className="text-2xl font-bold">GAME VAULT</span>
            </div>
          </Link>
        </div>

        <ul className="flex space-x-12 font-normal">
          <li className="flex items-center">
            {/* <ThemeToggle /> */}
          </li>

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
          <Link href={"/profile"} className="flex items-center">Profile</Link>


          {user.user.role === "ADMIN" && 
          <Link href={"/admin"} className="flex items-center">Admin Dashboard</Link>
          
          }

          <li>
            <button
              onClick={logout}
              className=" hover:text-[#fa9a00ef] transition-all px-3 py-2 rounded-md "
            >
              Logout
            </button>
          </li>
          <li className="flex items-center pb-1">
            <Link
              href="/basket"
              className="hover:text-orange-500 transition-all flex items-center space-x-1"
            >
              <ShoppingBasket />
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className=" top-0 left-0 w-full z-10 flex justify-between items-center p-1 pr-10 bg-gray-950 text-white font-sans font-bold">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-orange-500 transition-all">
            <div className="flex items-center space-x-2">
              <img src="/logo-white.png" alt="logo" className="w-16 h-16" />
              <span className="text-2xl font-bold">GAME VAULT</span>
            </div>
          </Link>
        </div>

        <ul className="flex space-x-12">
          <li className="flex items-center">
            <Link
              href="/shop"
              className="hover:text-[#fa9a00ef] transition-all"
            >
              Shop
            </Link>
          </li>
         
        
          <li className="flex items-center">
            <Link
              href="/login"
              className="hover:text-[#fa9a00ef] transition-all"
            >
              Login/Sign up
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href="/login"
              className="hover:text-[#fa9a00ef] transition-all"
            >
              About Us
            </Link>
          </li>
        
          
          <li className="flex items-center">
            <Link
              href="/basket"
              className="hover:text-[#fa9a00ef] transition-all flex items-center space-x-1"
            >
              <ShoppingBasket />
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
