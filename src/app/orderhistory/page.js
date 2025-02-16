"use client";
import { useState } from "react";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [category, setCategory] = useState("all");
  const [timeFrame, setTimeFrame] = useState("all");

  const toggleDetails = (id) => {
    setExpandedOrder(id === expandedOrder ? null : id);
  };

  // Sample order data
  const orders = [
    { id: "307892", date: "March 16, 2025", game: "Game Vault Action", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", category: "Action", image: "/game-vault-action.jpg", details: "Shipped via DHL, tracking number: XYZ123" },
    { id: "307882", date: "October 16, 2024", game: "Game Vault RPG", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Delivered", category: "RPG", image: "/game-vault-rpg.jpg", details: "Shipped via FedEx, tracking number: ABC456" },
    { id: "307872", date: "July 16, 2024", game: "Game Vault Adventure", price: "£1,399.99", payment: "Paid with GameVault Points", status: "Delivered", category: "Adventure", image: "/game-vault-adventure.jpg", details: "Shipped via UPS, tracking number: DEF789" },
    { id: "307862", date: "January 16, 2024", game: "Game Vault Sports", price: "£1,209.99", payment: "Paid with GameVault Points", status: "Refunded", category: "Sports", image: "/game-vault-sports.jpg", details: "Refund issued on February 1, 2024" },
  ];

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    let withinTimeFrame = true;

    if (timeFrame === "3months") {
      withinTimeFrame = orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 3));
    } else if (timeFrame === "6months") {
      withinTimeFrame = orderDate >= new Date(currentDate.setMonth(currentDate.getMonth() - 6));
    }

    return (category === "all" || order.category === category) && withinTimeFrame;
  });

  const recentOrders = filteredOrders.slice(0, 2);
  const pastOrders = filteredOrders.slice(2);

  return (
    <div className="min-h-screen bg-[#111] text-white px-6 py-8">
      {/* Header */}
      <div className="border-b border-gray-600 pb-4 mb-6 text-center">
        <h1 className="text-4xl font-bold">Order History</h1>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <select className="bg-gray-800 text-white p-2 rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="all"> View All Categories</option>
          <option value="Action">Action</option>
          <option value="RPG">RPG</option>
          <option value="Adventure">Adventure</option>
          <option value="Sports">Sports</option>
        </select>
        <select className="bg-gray-800 text-white p-2 rounded" onChange={(e) => setTimeFrame(e.target.value)}>
          <option value="all"> ordered within </option>
          <option value="3months"> Past 3 Months</option>
          <option value="6months"> Past 6 Months</option>
          <option value="12months"> Past 12 Months</option>
        </select>
      </div>

      {/* Orders Section */}
      {[{ title: "Recent Orders", orders: recentOrders }, { title: "Past Orders", orders: pastOrders }].map(({ title, orders }) => (
        <div key={title}>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <div className="space-y-6">
            {orders.map((order) => (
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
                  <div className="mt-4 text-sm text-gray-400">
                    <p>Payment Method: {order.payment}</p>
                    <p>Status: {order.status}</p>
                    <p>{order.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="mt-10 flex justify-center space-x-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">Continue Shopping</button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">Proceed to Checkout</button>
      </div>
    </div>
  );
}
