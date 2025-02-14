"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

const BasketPage = () => {
  // Sample Cart Data (Replace with context or API calls)
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Vertical Lipstick Print Foldaway Backpack",
      price: 125.0,
      quantity: 2,
      img: "/path-to-backpack.jpg", // Replace with actual image path
    },
  ]);

  const deliveryCharge = 4.95;

  // Update Quantity Function
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Remove Item Function
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate Total Cart Price
  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6">MY BAG</h1>

      {/* Continue Shopping & Checkout Buttons */}
      <div className="flex justify-between mb-6">
        <Link href="/shop">
          <button className="border px-6 py-2 text-gray-600 hover:bg-gray-100">
            CONTINUE SHOPPING
          </button>
        </Link>
        <Link href="/checkout">
          <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">
            CHECKOUT
          </button>
        </Link>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-5 text-gray-700 font-semibold py-4 border-b">
        <div className="col-span-2">PRODUCT DESCRIPTION</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-right">SUBTOTAL</div>
      </div>

      {/* Cart Items */}
      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5 items-center py-4 border-b text-black">
          {/* Product Image & Name */}
          <div className="flex col-span-2 items-center">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover mr-4" />
            <span className="font-medium">{item.title}</span>
          </div>

          {/* Price */}
          <div className="text-center font-medium">£{item.price.toFixed(2)}</div>

          {/* Quantity Control */}
          <div className="flex items-center justify-center space-x-2">
            <button
              className="p-1 border rounded hover:bg-gray-200"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="w-12 text-center border p-1"
            />
            <button
              className="p-1 border rounded hover:bg-gray-200"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Subtotal & Remove */}
          <div className="flex justify-between items-center text-right">
            <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
            <button
              className="text-gray-500 hover:text-red-500 ml-4"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Summary Section */}
      <div className="bg-gray-100 p-4 mt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>SUBTOTAL</span>
          <span>£{getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold mt-2">
          <span>DELIVERY</span>
          <span>£{deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span>TOTAL</span>
          <span>£{(getCartTotal() + deliveryCharge).toFixed(2)}</span>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-6">
        <Link href="/shop">
          <button className="border px-6 py-2 text-gray-600 hover:bg-gray-100">
            CONTINUE SHOPPING
          </button>
        </Link>
        <Link href="/checkout">
          <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
