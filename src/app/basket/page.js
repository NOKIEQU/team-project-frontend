"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

const BasketPage = () => {
  const [cart, setCart] = useState([
    { id: 1, title: "Game 1", price: 125.0, quantity: 1, img: "/images/backpack.jpg" },
    { id: 2, title: "Game 2", price: 75.0, quantity: 1, img: "/images/wallet.jpg" },
    { id: 3, title: "Game 3", price: 199.99, quantity: 1, img: "/images/headphones.jpg" },
  ]);

  const deliveryCharge = 4.95;

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-[#1A1A22] min-h-screen p-10 text-[#F5F5F5]">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide">MY BASKET</h1>

      <div className="grid grid-cols-5 text-[#F5F5F5] font-semibold py-3 border-b border-[#444]">
        <div className="col-span-2">PRODUCT</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-right">TOTAL</div>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5 items-center py-4 border-b border-[#444] bg-[#F0ECEC] shadow-md p-4 rounded-md">
          <div className="flex col-span-2 items-center">
            <img src={item.img} alt={item.title} className="w-20 h-20 object-cover mr-4 rounded-md shadow" />
            <span className="font-medium text-[#000000] text-lg">{item.title}</span>
          </div>
          <div className="text-center font-medium text-[#000000]">£{item.price.toFixed(2)}</div>
          <div className="flex items-center justify-center space-x-2">
            <button className="p-2 border border-[#000000] rounded-md bg-[#F0ECEC] hover:bg-[#E4DFDF] transition" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-4 w-4 text-[#000000]" />
            </button>
            <input type="text" value={item.quantity} readOnly className="w-12 text-center border border-[#000000] p-2 bg-[#F0ECEC] text-[#000000] rounded-md" />
            <button className="p-2 border border-[#000000] rounded-md bg-[#F0ECEC] hover:bg-[#E4DFDF] transition" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-4 w-4 text-[#000000]" />
            </button>
          </div>
          <div className="flex justify-between items-center text-right">
            <span className="font-semibold text-[#000000] text-lg">£{(item.price * item.quantity).toFixed(2)}</span>
            <button className="text-[#000000] hover:text-[#E63946] transition ml-4" onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <div className="bg-[#F0ECEC] p-6 mt-8 shadow-lg rounded-md">
        <div className="flex justify-between text-lg font-semibold text-[#000000]">
          <span>Subtotal</span>
          <span>£{getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-[#000000] mt-2">
          <span>Delivery</span>
          <span>£{deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-[#000000] mt-4 border-t pt-4 border-[#888]">
          <span>Total</span>
          <span>£{(getCartTotal() + deliveryCharge).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/shop">
          <button className="border border-[#000000] px-6 py-3 text-[#000000] bg-[#F0ECEC] hover:bg-[#E4DFDF] transition rounded-md shadow-md">
            Continue Shopping
          </button>
        </Link>
        <Link href="/checkout">
          <button className="bg-[#F0ECEC] text-[#000000] px-6 py-3 border border-[#000000] hover:bg-[#E4DFDF] transition rounded-md shadow-md">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
