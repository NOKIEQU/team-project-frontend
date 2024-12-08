"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useCart } from "../../context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";

function BasketPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="bg-[#0d1b2a] min-h-screen">
     

      <div className="flex justify-around text-black text-base py-3 bg-[#FFA800]">
        <div className="font-black text-lg">Basket</div>
      </div>

      <div className="p-4 px-4 sm:px-8 lg:px-16 xl:px-52">
        {/* Table Header */}
        <div className="flex justify-between items-center py-3 border-b-2 border-gray-300 mb-4 flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <span className="font-semibold text-lg text-white">Product</span>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-8 min-w-[280px]">
            <div className="min-w-[140px] text-center">
              <span className="font-semibold text-lg text-white">Quantity</span>
            </div>
            <div className="min-w-[100px] text-right text-white">
              <span className="font-semibold text-lg">Price</span>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b border-gray-200 flex-wrap gap-4"
          >
            {/* Product Image and Title */}
            <div className="flex items-center flex-1 min-w-[150px]">
              <div className="shop-image-container">
                <ShopImage name={item.title} img={item.img} />
              </div>
              <span className="pl-3 text-sm font-medium text-white">
                {item.title}
              </span>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center space-x-4 sm:space-x-8 flex-wrap min-w-[280px]">
              {/* Quantity Controls */}
              <div className="quantity-container flex items-center bg-gray-100 rounded-lg px-2 py-1">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="mx-4 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 p-0 hover:bg-gray-200 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Price */}
              <div className="price-container min-w-[100px] text-right">
                <span className="font-semibold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="h-8 w-8 p-0 hover:bg-[#fa9a00ef] rounded-full"
              >
                <Trash2 className="h-4 w-4 text-[#f6a302]" />
              </button>
            </div>
          </div>
        ))}

        {/* Grand Total */}
        <div className="mt-8 border-t border-gray-200 pt-4">
          <h1 className="text-xl font-semibold text-right text-white">
            Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toFixed(2)}
          </h1>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex flex-col md:flex-row justify-between p-4 px-4 sm:px-8 lg:px-16 xl:px-52 space-y-4 md:space-y-0">
        <Link href={"/shop"}>
          <button
            className="hover:bg-yellow-500 transition-colors text-black font-semibold py-2 px-6 rounded"
            style={{ backgroundColor: "#FFA800" }}
          >
            Continue Shopping
          </button>
        </Link>

        </div>
        </div>
        );

}
export default BasketPage;