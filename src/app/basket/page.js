"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "../../context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";

const BasketPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="bg-white p-8">
      {/* Header Section */}
      <div className="text-black text-lg font-bold py-4 border-b">Basket</div>

      {/* Table Headers */}
      <div className="grid grid-cols-5 text-gray-700 font-semibold py-4 border-b">
        <div className="col-span-2">PRODUCT DESCRIPTION</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-right">TOTAL</div>
      </div>

      {/* Cart Items */}
      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5 items-center py-4 border-b text-black">
          <div className="flex col-span-2 items-center">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover mr-4" />
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="text-center font-medium">£{item.price.toFixed(2)}</div>
          
          {/* Quantity Control */}
          <div className="flex items-center justify-center space-x-2">
            <button
              className="p-1 border rounded hover:bg-gray-200"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center border p-1">{item.quantity}</span>
            <button
              className="p-1 border rounded hover:bg-gray-200"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Total Price and Remove Button */}
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

      {/* Grand Total Section */}
      <div className="flex justify-end mt-6 text-xl font-semibold">
        Grand Total: £{getCartTotal().toFixed(2)}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <Link href="/shop">
          <button className="border px-6 py-2 text-gray-600 hover:bg-gray-100">Continue Shopping</button>
        </Link>
        <Link href="/checkout">
          <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
