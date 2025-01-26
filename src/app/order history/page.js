"use client";

import React from "react";

function OrderHistoryPage() {
  const orders = [
    {
      id: "ORD001",
      date: "2024-01-20",
      items: [
        { name: "Chocolate Chip Cookie Dough", quantity: 2, price: "£12" },
        { name: "Brownie Delight", quantity: 1, price: "£6" },
      ],
      total: "£30",
    },
    {
      id: "ORD002",
      date: "2024-01-15",
      items: [{ name: "Peanut Butter Bliss", quantity: 3, price: "£18" }],
      total: "£20",
    },
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-8">Order History</h1>
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-3 bg-gray-800 p-5 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-500 mb-4">Filters</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Dates</h3>
            <input
              type="date"
              className="w-full p-2 rounded bg-gray-700 text-gray-200"
            />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-200 mb-2">
              Order Status
            </h3>
            <ul>
              <li>
                <input type="checkbox" id="completed" className="mr-2" />
                <label htmlFor="completed" className="text-gray-200">
                  Completed
                </label>
              </li>
              <li>
                <input type="checkbox" id="pending" className="mr-2" />
                <label htmlFor="pending" className="text-gray-200">
                  Pending
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Orders */}
        <section className="col-span-9">
          <div className="grid grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800 text-gray-200 p-5 rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-bold text-yellow-500 mb-2">
                  Order ID: {order.id}
                </h2>
                <p className="text-sm text-gray-400 mb-4">Date: {order.date}</p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Items:</h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-300 mb-1"
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} x {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-yellow-500 font-bold">
                  <span>Total:</span>
                  <span>{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
