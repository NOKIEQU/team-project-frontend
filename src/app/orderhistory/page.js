"use client";
import { useState } from "react";

export default function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [category, setCategory] = useState("all");
  const [timeFrame, setTimeFrame] = useState("all");

  const toggleDetails = (id) => {
    setExpandedOrder(id === expandedOrder ? null : id);
  };


  const orders = [
    { id: "304010", date: "March 11, 2025", game: "Game Vault Action", price: "£399.00", payment: "Paid with GameVault Points", status: "Delivered", category: "Action", image: "/game-vault-action.jpg", details: "Delivered via DHL, tracking number: XYZ123" },
    { id: "304011", date: "April 12, 2025", game: "Game Vault RPG", price: "£219.00", payment: "Paid with GameVault Points", status: "Delivered", category: "RPG", image: "/game-vault-rpg.jpg", details: "Delivered via FedEx, tracking number: ABC456" },
    { id: "304012", date: "March 20, 2025", game: "Game Vault Action", price: "£399.00", payment: "Paid with GameVault Points", status: "Delivered", category: "Action", image: "/game-vault-action.jpg", details: "Delivered via DHL, tracking number: XYZ123" },
    { id: "304013", date: "October 16, 2024", game: "Game Vault RPG", price: "£219.00", payment: "Paid with GameVault Points", status: "Delivered", category: "RPG", image: "/game-vault-rpg.jpg", details: "Delivered via FedEx, tracking number: ABC456" },
    { id: "304014", date: "July 26, 2024", game: "Game Vault Adventure", price: "£399.00", payment: "Paid with GameVault Points", status: "Delivered", category: "Adventure", image: "/game-vault-adventure.jpg", details: "Delivered via UPS, tracking number: DEF789" },
    { id: "304015", date: "January 29, 2024", game: "Game Vault Sports", price: "£500.00", payment: "Paid with GameVault Points", status: "Processed", category: "Sports", image: "/game-vault-sports.jpg", details: "Order processed, preparing for dispatch" },
    { id: "304016", date: "July 10, 2024", game: "Game Vault Adventure", price: "£399.00", payment: "Paid with GameVault Points", status: "Delivered", category: "Adventure", image: "/game-vault-adventure.jpg", details: "Delivered via UPS, tracking number: DEF789" },
    { id: "304017", date: "January 13, 2024", game: "Game Vault Sports", price: "£500.00", payment: "Paid with GameVault Points", status: "Pending", category: "Sports", image: "/game-vault-sports.jpg", details: "Order received, awaiting processing" },
    { id: "304018", date: "November 22, 2024", game: "Game Vault Fantasy", price: "£299.00", payment: "Paid with GameVault Points", status: "Delivered", category: "Fantasy", image: "/game-vault-fantasy.jpg", details: "Delivered via DHL, tracking number: GHI123" },
    { id: "304019", date: "December 5, 2024", game: "Game Vault Puzzle", price: "£159.00", payment: "Paid with GameVault Points", status: "Processed", category: "Puzzle", image: "/game-vault-puzzle.jpg", details: "Order processed, preparing for dispatch" },
    { id: "304020", date: "February 18, 2025", game: "Game Vault Racing", price: "£249.00", payment: "Paid with GameVault Points", status: "Pending", category: "Racing", image: "/game-vault-racing.jpg", details: "Order received, awaiting processing" }
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
    <div className="min-h-screen bg-[#1A1A22] text-white px-6 py-8">
      {/* Header */}
      <div className="border-b border-gray-600 pb-4 mb-6 text-center">
        <h1 className="text-4xl font-bold">Order History</h1>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <select className="bg-[#F0ECEC] text-[#111] p-2 rounded" onChange={(e) => setCategory(e.target.value)}>
          <option value="all"> View All Categories</option>
          <option value="Action">Action</option>
          <option value="RPG">RPG</option>
          <option value="Adventure">Adventure</option>
          <option value="Sports">Sports</option>
        </select>
        <select className=" bg-[#F0ECEC] text-[#111] p-2 rounded" onChange={(e) => setTimeFrame(e.target.value)}>
          <option value="all"> Order Date </option>
          <option value="3months">ordered within Past 3 Months</option>
          <option value="6months">ordered within Past 6 Months</option>
          <option value="12months">ordered within Past 12 Months</option>
          <option value="1 year">ordered within Past 1 year</option>
          <option value="2 year">ordered within Past 2 years</option>
        </select>
      </div>

      {/* Orders Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-6">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-[#F0ECEC] p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md text-[#111]" />
                  <div>
                    <p className="text-sm font-bold text-[#111]">{order.date}</p>
                    <p className="text-lg font-semibold text-[#111]">{order.game}</p>
                    <p className="text-sm text-[#111]">Order Number: {order.id}</p>
                    <p className="text-md font-bold text-[#111]">{order.price}</p>
                    <p className="text-sm text-[#111]">{order.payment}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered" ? "bg-[#111]" : "hover:bg-[#d9d9d9]"} text-[#F0ECEC]`}>
                    {order.status}
                  </span>
                  <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-[#111] hover:text-[#111] transition">
                    {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4 text-sm text-[#111]">
                  <p>Payment Method: {order.payment}</p>
                  <p>Status: {order.status}</p>
                  <p>{order.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Past Orders with Increased Margin */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 ">Past Orders</h2>
        <div className="space-y-6">
          {pastOrders.map((order) => (
            <div key={order.id} className="bg-[#F0ECEC] p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={order.image} alt={order.game} className="w-20 h-20 rounded-md text-[#111]" />
                  <div>
                    <p className="text-sm font-bold text-[#111]">{order.date}</p>
                    <p className="text-lg font-semibold text-[#111]">{order.game}</p>
                    <p className="text-sm text-[#111]">Order Number: {order.id}</p>
                    <p className="text-md font-bold text-[#111]">{order.price}</p>
                    <p className="text-sm text-[#111]">{order.payment}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Delivered", "Processed", "Pending" ? "bg-[#111]" : "hover:bg-[#d9d9d9]"} text-[#F0ECEC]`}>
                    
                    {order.status}
                  </span>
                  <button onClick={() => toggleDetails(order.id)} className="mt-3 text-sm text-[#111] hover:text-[#111] transition">
                    {expandedOrder === order.id ? "Hide Details" : "Show Details"}
                  </button>
                </div>
              </div>
              {expandedOrder === order.id && (
                <div className="mt-4 text-sm text-[#111]">
                  <p>Payment Method: {order.payment}</p>
                  <p>Status: {order.status}</p>
                  <p>{order.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-end space-x-4">
        <button className="bg-[#F0ECEC] hover:bg-[#d9d9d9] text-[#111] px-6 py-3 rounded-lg font-semibold">Continue Shopping</button>
      </div>
    </div>
  );
}
