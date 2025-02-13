"use client";
import { useState } from "react";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [monthFilter, setMonthFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const toggleDetails = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  // Sample order data
  const orders = [
    { id: "307892", date: "March 16, 2025", game: "Game Vault Action", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", category: "Action", image: "/game-vault-action.jpg" },
    { id: "307882", date: "October 16, 2025", game: "Game Vault RPG", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Delivered", category: "RPG", image: "/game-vault-rpg.jpg" },
    { id: "307872", date: "July 10, 2024", game: "Game Vault Strategy", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", category: "Strategy", image: "/game-vault-strategy.jpg" },
    { id: "307862", date: "May 5, 2024", game: "Game Vault Adventure", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Refunded", category: "Adventure", image: "/game-vault-adventure.jpg" },
  ];

  const filterOrders = (orders) => {
    const now = new Date();
    return orders.filter((order) => {
      const orderDate = new Date(order.date);
      let isWithinTimeRange = true;
      
      if (monthFilter !== "all") {
        const monthsAgo = monthFilter === "3m" ? 3 : monthFilter === "6m" ? 6 : 12;
        const pastDate = new Date();
        pastDate.setMonth(now.getMonth() - monthsAgo);
        isWithinTimeRange = orderDate >= pastDate;
      }
      
      const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
      return isWithinTimeRange && matchesCategory;
    });
  };

  const filteredOrders = filterOrders(orders);

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6">
        {/* Filters */}
        <div className="flex space-x-4">
          <select onChange={(e) => setMonthFilter(e.target.value)} className="bg-gray-800 text-white px-3 py-2 rounded-md">
            <option value="all">All Time</option>
            <option value="3m">Past 3 Months</option>
            <option value="6m">Past 6 Months</option>
            <option value="1y">Past Year</option>
          </select>
          <select onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-800 text-white px-3 py-2 rounded-md">
            <option value="all">All Categories</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Strategy">Strategy</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
        <h1 className="text-3xl font-semibold text-center flex-1">Order History</h1>
      </div>

      {/* Orders Section */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-400">No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md" />
                  <div>
                    <p className="text-sm font-bold text-gray-400">{order.date}</p>
                    <p className="text-lg font-semibold">{order.game}</p>
                    <p className="text-sm text-gray-500">Order Number: {order.id}</p>
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
                  <p><b>Payment Method:</b> {order.payment}</p>
                  <p><b>Status:</b> {order.status}</p>
                  <p><b>Category:</b> {order.category}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
