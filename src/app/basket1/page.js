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
    <div className="bg-background min-h-screen p-8 text-foreground">
      <h1 className="text-4xl font-bold text-center mb-6">MY BAG</h1>

      <div className="grid grid-cols-5 text-muted-foreground font-semibold py-4 border-b border-border">
        <div className="col-span-2">PRODUCT DESCRIPTION</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-right">TOTAL</div>
      </div>

      {cart.map((item) => (
        <div key={item.id} className="grid grid-cols-5 items-center py-4 border-b border-border bg-card shadow-sm p-4">
          <div className="flex col-span-2 items-center">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-cover mr-4 rounded-lg shadow-md" />
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="text-center font-medium">£{item.price.toFixed(2)}</div>
          <div className="flex items-center justify-center space-x-2">
            <button className="p-1 border border-border rounded hover:bg-accent" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Minus className="h-4 w-4" />
            </button>
            <input type="text" value={item.quantity} readOnly className="w-12 text-center border border-border p-1 bg-muted" />
            <button className="p-1 border border-border rounded hover:bg-accent" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between items-center text-right">
            <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
            <button className="text-muted-foreground hover:text-destructive ml-4" onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      <div className="bg-card p-4 mt-6 shadow-md rounded-lg">
        <div className="flex justify-between text-lg font-semibold">
          <span>TOTAL</span>
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

      <div className="flex justify-between mt-6">
        <Link href="/shop">
          <button className="border border-border px-6 py-2 text-muted-foreground hover:bg-accent">CONTINUE SHOPPING</button>
        </Link>
        <Link href="/checkout">
          <button className="bg-primary text-primary-foreground px-6 py-2 hover:bg-primary/80">CHECKOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default BasketPage;
