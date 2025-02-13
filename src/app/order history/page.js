"use client";
import { useState } from "react";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Sample order data
  const orders = [
    { id: "307892", date: "March 16, 2025", game: "Game Vault Action", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", image: "/game-vault-action.jpg" },
    { id: "307882", date: "October 16, 2025", game: "Game Vault Action", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Delivered", image: "/game-vault-action.jpg" },
    { id: "307872", date: "October 16, 2025", game: "Game Vault Action", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", image: "/game-vault-action.jpg" },
    { id: "307862", date: "October 16, 2025", game: "Game Vault Action", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Refunded", image: "/game-vault-action.jpg" },
  ];

  const recentOrders = orders.slice(0, 2); // First two are recent
  const pastOrders = orders.slice(2); // Last two are past

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6">
        {/* Left Navigation */}
        <nav className="flex space-x-4 text-gray-400">
          <span className="hover:text-white cursor-pointer">
            View <b>All Categories</b>
          </span>
          <span className="hover:text-white cursor-pointer">
            Ordered Within <b>Past 3 Months</b>
          </span>
        </nav>

        {/* Centered Title */}
        <h1 className="text-3xl font-semibold text-center flex-1">Order History</h1>
      </div>

      {/* Recent Orders Section */}
      <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
      <div className="space-y-6">
        {recentOrders.map((order) => (
          <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Game Image */}
                <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md" />

                {/* Order Details */}
                <div>
                  <p className="text-sm font-bold text-gray-400">{order.date}</p>
                  <p className="text-lg font-semibold">{order.game}</p>
                  <p className="text-sm text-gray-500">Order Number: {order.id}</p>
                  <p className="text-md font-bold text-[#c0392b]">{order.price}</p>
                  <p className="text-sm text-gray-400">{order.payment}</p>
                </div>
              </div>

              {/* Status & Show Details */}
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {order.status}
                </span>
                <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-gray-400 hover:text-white transition">
                  {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300">
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Game:</b> {order.game}</p>
                <p><b>Date:</b> {order.date}</p>
                <p><b>Price:</b> {order.price}</p>
                <p><b>Payment Method:</b> {order.payment}</p>
                <p><b>Status:</b> {order.status}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Past Orders Section */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Past Orders</h2>
      <div className="space-y-6">
        {pastOrders.map((order) => (
          <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Game Image */}
                <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md" />

                {/* Order Details */}
                <div>
                  <p className="text-sm font-bold text-gray-400">{order.date}</p>
                  <p className="text-lg font-semibold">{order.game}</p>
                  <p className="text-sm text-gray-500">Order Number: {order.id}</p>
                  <p className="text-md font-bold text-[#c0392b]">{order.price}</p>
                  <p className="text-sm text-gray-400">{order.payment}</p>
                </div>
              </div>

              {/* Status & Show Details */}
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"} text-white`}>
                  {order.status}
                </span>
                <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-gray-400 hover:text-white transition">
                  {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedOrder === order.id && (
              <div className="mt-4 p-3 bg-gray-900 rounded-lg text-sm text-gray-300">
                <p><b>Order ID:</b> {order.id}</p>
                <p><b>Game:</b> {order.game}</p>
                <p><b>Date:</b> {order.date}</p>
                <p><b>Price:</b> {order.price}</p>
                <p><b>Payment Method:</b> {order.payment}</p>
                <p><b>Status:</b> {order.status}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
