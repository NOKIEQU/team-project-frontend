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
    <div className="bg-[#121212] min-h-screen p-8 text-[#f5f5f5]">
      <h1 className="text-4xl font-bold text-center mb-2"> MY BASKET </h1>
      <hr className="border-t border-[#333] mb-6" />

      <div className="grid grid-cols-5 text-[#b0b0b0] font-semibold py-4 border-b border-[#333]">
        <div className="col-span-2">PRODUCT DESCRIPTION</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-right">TOTAL</div>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5 items-center py-4 border-b border-[#333] bg-[#1e1e1e] shadow-sm p-4 rounded-lg">
          <div className="flex col-span-2 items-center">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover mr-4 rounded-lg shadow-md" />
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="text-center font-medium text-[#e0e0e0]">£{item.price.toFixed(2)}</div>
          <div className="flex items-center justify-center space-x-2">
            <button className="p-1 border border-[#555] rounded hover:bg-[#272727]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-4 w-4 text-[#b0b0b0]" />
            </button>
            <input type="text" value={item.quantity} readOnly className="w-12 text-center border border-[#555] p-1 bg-[#272727] text-white" />
            <button className="p-1 border border-[#555] rounded hover:bg-[#272727]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-4 w-4 text-[#b0b0b0]" />
            </button>
          </div>
          <div className="flex justify-between items-center text-right">
            <span className="font-medium text-[#e0e0e0]">£{(item.price * item.quantity).toFixed(2)}</span>
            <button className="text-[#b0b0b0] hover:text-[#ff4c4c] ml-4" onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <div className="bg-[#1e1e1e] p-4 mt-6 shadow-md rounded-lg">
        <div className="flex justify-between text-lg font-semibold text-[#e0e0e0]">
          <span>TOTAL</span>
          <span>£{getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-[#e0e0e0] mt-2">
          <span>DELIVERY</span>
          <span>£{deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-white mt-4">
          <span>TOTAL</span>
          <span>£{(getCartTotal() + deliveryCharge).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/shop">
          <button className="border border-[#555] px-6 py-2 text-[#b0b0b0] hover:bg-[#272727] rounded-lg">
            CONTINUE SHOPPING
          </button>
        </Link>
        <Link href="/checkout">
          <button className="bg-[#ff4c4c] text-white px-6 py-2 hover:bg-[#e04343] rounded-lg">
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
