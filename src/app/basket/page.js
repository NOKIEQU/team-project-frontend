"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useCart } from "../../context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
 
function BasketPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
 
  // Add an effect to handle zoom level
  useEffect(() => {
    const handleZoom = () => {
      const zoom = window.devicePixelRatio || 1; // Get the current zoom level
      const scale = 1 / zoom; // Calculate the scale factor
      const root = document.documentElement;
 
      root.style.setProperty("--zoom-scale", scale); // Store scale in a CSS variable
    };
 
    handleZoom(); // Call on initial load
    window.addEventListener("resize", handleZoom); // Listen for resize/zoom changes
 
    return () => {
      window.removeEventListener("resize", handleZoom); // Cleanup listener
    };
  }, []);
 
  return (
    <div className="bg-[#0d1b2a]">
 
 
      <div className="flex justify-around text-black text-base py-2 bg-[#FFA800]">
        <div className="font-black text-lg">Basket</div>
      </div>
      <div className="p-4 px-52">
        <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 mb-4">
          <div className="flex-1">
            <span className="font-semibold text-lg text-white">Product</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="min-w-[140px] text-center">
              <span className="font-semibold text-lg text-white">Quantity</span>
            </div>
            <div className="min-w-[100px] text-right text-white">
              <span className="font-semibold text-lg">Price</span>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
 
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
            <div className="flex items-center flex-1">
              <div className="shop-image-container">
                <ShopImage name={item.title} img={item.img} />
              </div>
              <span className="pl-3 text-sm font-medium text-white">{item.title}</span>
            </div>
            <div className="flex items-center space-x-8">
              <div className="quantity-container flex items-center bg-gray-100 rounded-lg px-2 py-1">
                <button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-4 font-medium">{item.quantity}</span>
                <button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="price-container min-w-[100px] text-right">
                <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
                className="h-8 w-8 p-0 hover:bg-[#fa9a00ef] rounded-full"
              >
                <Trash2 className="h-4 w-4 text-[#f6a302]" />
              </button>
            </div>
          </div>
        ))}
 
        <div className="mt-8 border-t border-gray-200 pt-4">
          <h1 className="text-xl font-semibold text-right text-white">
            Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toFixed(2)}
          </h1>
        </div>
      </div>
 
      <div className="flex justify-between p-4 px-52 text-base">
        <Link href={"/shop"}>
          <button
            className="hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded"
            style={{ backgroundColor: "#FFA800" }}
          >
            Continue Shopping
          </button>
        </Link>
        <Link href={"/checkout"}>
          <button
            className="hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded"
            style={{ backgroundColor: "#FFA800" }}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
 
function ShopImage({ name, img }) {
  return (
    <div className="flex items-center py-3">
      <img src={img} alt={name} className="w-[100px] h-[100px] mr-2" />
    </div>
  );
}
 
export default BasketPage;
 