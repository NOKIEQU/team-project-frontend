"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/cart-context";

const BasketPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  
  
  const totalAmount = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="bg-[#1A1A22] min-h-screen text-white p-6 lg:p-16 flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-400 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your basket is empty</h1>
        <p className="text-gray-400 mb-8">Looks like you haven't added any games to your basket yet.</p>
        <Link href="/shop">
          <button className="bg-[#fa9a00ef] hover:bg-[#e08800] px-6 py-3 text-white rounded-full font-bold transition-all duration-300 flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A22] min-h-screen text-white p-6 lg:p-16">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8">Your Basket</h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-7 border-b border-[#3A3A4A] py-4 font-medium text-gray-300">
          <div className="col-span-3">Product</div>
          <div className="text-center">Price</div>
          <div className="text-center col-span-2">Quantity</div>
          <div className="text-right">Total</div>
        </div>

        {cart.map((item) => (
          <div key={item.id} className="grid grid-cols-7 items-center py-6 border-b border-[#3A3A4A]">
            <div className="flex col-span-3 items-center gap-4">
              <div className="w-20 h-20 overflow-hidden rounded-lg">
                <img 
                  src={item.img || "/placeholder.svg"} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium text-white">{item.title}</span>
            </div>
            <div className="text-center">£{item.price.toFixed(2)}</div>
            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center bg-[#252530] border border-[#3A3A4A] rounded-full px-3 py-1">
                <button
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] p-2 rounded-full text-white transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="mx-4 text-white min-w-[20px] text-center">{item.quantity}</span>
                <button
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] p-2 rounded-full text-white transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="text-right flex items-center justify-end">
              <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
              <button
                className="ml-6 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6">
        {cart.map((item) => (
          <div key={item.id} className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img 
                  src={item.img || "/placeholder.svg"} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="text-gray-300">£{item.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center bg-[#1A1A22] border border-[#3A3A4A] rounded-full px-2 py-1">
                <button
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] p-1 rounded-full text-white transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} />
                </button>
                <span className="mx-3 text-white">{item.quantity}</span>
                <button
                  className="bg-[#3A3A4A] hover:bg-[#4A4A5A] p-1 rounded-full text-white transition-colors"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={12} />
                </button>
              </div>
              
              <div className="flex items-center">
                <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-10 lg:mt-16 md:flex md:justify-between md:items-start">
        <div className="md:w-1/2 lg:w-1/3 mb-8 md:mb-0">
          <Link href="/shop">
            <button className="flex items-center bg-[#252530] hover:bg-[#3A3A4A] text-white px-6 py-3 rounded-full transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="bg-[#252530] border border-[#3A3A4A] rounded-lg p-6 md:w-1/2 lg:w-1/3">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 border-b border-[#3A3A4A] pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Subtotal</span>
              <span>£{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Digital Downloads</span>
              <span className="text-green-400">Instant Delivery</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg">£{totalAmount.toFixed(2)}</span>
          </div>
          
          <Link href="/checkout">
            <button className="w-full bg-[#fa9a00ef] hover:bg-[#e08800] text-white py-3 rounded-full font-bold mt-6 transition-all duration-300">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;