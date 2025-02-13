"use client";
import { useState } from "react";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Sample order data
  const orders = [
    { id: "307892", date: "2025-03-16", game: "Game Vault Action", price: "\u00a31,399.99", payment: "GameVault Points", status: "Delivered", image: "/game-vault-action.jpg", category: "Action" },
    { id: "307882", date: "2025-10-16", game: "Game Vault RPG", price: "\u00a31,209.99", payment: "GameVault Points", status: "Delivered", image: "/game-vault-rpg.jpg", category: "RPG" },
    { id: "307872", date: "2025-10-16", game: "Game Vault Shooter", price: "\u00a31,399.99", payment: "GameVault Points", status: "Delivered", image: "/game-vault-shooter.jpg", category: "Shooter" },
    { id: "307862", date: "2025-10-16", game: "Game Vault Sports", price: "\u00a31,209.99", payment: "GameVault Points", status: "Refunded", image: "/game-vault-sports.jpg", category: "Sports" },
  ];

  const filteredOrders = orders.filter(order => 
    (selectedMonth ? order.date.startsWith(selectedMonth) : true) &&
    (selectedCategory ? order.category === selectedCategory : true)
  );

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6">
        {/* Left Navigation */}
        <nav className="flex space-x-4 text-gray-400">
          <span className="hover:text-white cursor-pointer">Shops</span>
          <h1 className="text-3xl font-semibold">Order History</h1>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select 
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="2025-03">March 2025</option>
          <option value="2025-10">October 2025</option>
        </select>

        <select 
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Action">Action</option>
          <option value="RPG">RPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md" />
                <div>
                  <p className="text-sm font-bold text-gray-400">{order.date}</p>
                  <p className="text-lg font-semibold">{order.game}</p>
                  <p className="text-sm text-gray-500">Order #: {order.id}</p>
                  <p className="text-md font-bold text-[#c0392b]">{order.price}</p>
                  <p className="text-sm text-gray-400">{order.payment}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {order.status}
                </span>
                <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-gray-400 hover:text-white transition">
                  {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300">
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Game:</b> {order.game}</p>
                <p><b>Date:</b> {order.date}</p>
                <p><b>Price:</b> {order.price}</p>
                <p><b>Payment:</b> {order.payment}</p>
                <p><b>Status:</b> {order.status}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
