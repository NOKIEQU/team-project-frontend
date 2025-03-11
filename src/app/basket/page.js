"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";

function BasketPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  useEffect(() => {
    const handleZoom = () => {
      const zoom = window.devicePixelRatio || 1;
      document.documentElement.style.setProperty("--zoom-scale", 1 / zoom);
    };
    handleZoom();
    window.addEventListener("resize", handleZoom);
    return () => window.removeEventListener("resize", handleZoom);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A22] text-[#F0ECEC] font-oswald">
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden md:block">
        
      </div>

      <div className="flex justify-center items-center py-4 border-b border-gray-600">
  <h1 className="font-black text-3xl">Basket</h1> 
</div>


      <div className="p-4 md:px-16">
        <div className="hidden md:flex justify-between items-center py-3 border-b-2 border-gray-500 mb-4">
          <div className="flex-1">
            <span className="font-semibold text-lg">Product</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="min-w-[140px] text-center">
              <span className="font-semibold text-lg">Quantity</span>
            </div>
            <div className="min-w-[100px] text-right">
              <span className="font-semibold text-lg">Price</span>
            </div>
            <div className="w-8"></div>
          </div>
        </div>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row justify-between items-center py-3 mb-4 p-4 bg-[#F0ECEC] shadow-md rounded-lg border border-gray-300"
          >
            <div className="flex items-center flex-1 w-full md:w-auto">
              <ShopImage name={item.title} img={item.img} />
              <span className="pl-3 text-sm font-medium text-black">{item.title}</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 w-full md:w-auto">
              <div className="flex items-center bg-[#F0ECEC] shadow-md rounded-lg px-3 py-2 w-28 md:w-auto">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="h-10 w-10 p-0 bg-[#F0ECEC] hover:bg-gray-300 rounded-full flex justify-center items-center"
                >
                  <Minus className="h-5 w-5 text-black" />
                </button>
                <span className="mx-5 font-medium text-black text-base">{item.quantity}</span> 
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-10 w-10 p-0 bg-[#F0ECEC] hover:bg-gray-300 rounded-full flex justify-center items-center "
                >
                  <Plus className="h-5 w-5 text-black" />
                </button>
              </div>

              <div className="flex items-center space-x-4 w-full justify-between">
                <div className="text-right min-w-[100px] mt-2 md:mt-0 w-full md:w-auto">
                  <span className="font-semibold text-black">
                    £{ (item.price * item.quantity).toFixed(2) }
                  </span>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="h-8 w-8 p-0 hover:bg-gray-300 rounded-full mt-2 md:mt-0"
                >
                  <Trash2 className="h-4 w-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 border-t border-gray-500 pt-4">
          <h1 className="text-xl font-semibold text-right">
            Grand Total: £{getCartTotal() === 0 ? "0" : getCartTotal().toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="p-4 md:px-16 flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4">
        <Link href="/shop">
          <button className="w-full md:w-auto py-2 px-6 bg-[#F0ECEC] text-black font-semibold rounded transition-colors hover:bg-gray-300">
            Continue Shopping
          </button>
        </Link>
        <Link href="/checkout">
          <button className="w-full md:w-auto py-2 px-6 bg-[#F0ECEC] text-black font-semibold rounded transition-colors hover:bg-gray-300">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

function ShopImage({ name, img }) {
  return (
    <div className="flex-shrink-0">
      <img src={img} alt={name} className="w-20 h-20 object-cover mr-2" />
    </div>
  );
}

export default BasketPage;
