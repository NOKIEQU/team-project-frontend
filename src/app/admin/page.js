"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Gamepad2,
  BarChart,
  Layers,
  Users,
  ShoppingCart,
  Activity,
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";

function AdminPage() {
  const [orders, setOrders] = useState([]);
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  // Fetch orders only when the user is loaded
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userObject || !userObject.token) {
        console.error("User is not authenticated. Cannot fetch orders.");
        return;
      }

      try {
        const response = await fetch("http://51.77.110.253:3001/api/orders", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (isUserLoaded) {
      fetchOrders();
    }
  }, [isUserLoaded, userObject]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-950 text-white w-64 flex flex-col p-5 space-y-4">
        <nav className="space-y-2">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard />}
            text="Dashboard"
          />
          <SidebarLink href="/adminGames" icon={<Gamepad2 />} text="Games" />
          <SidebarLink href="/adminUsers" icon={<BarChart />} text="Users" />
          <SidebarLink href="/adminGenres" icon={<Layers />} text="Genres" />
          <SidebarLink href="/adminOrders" icon={<Layers />} text="Orders" />

        </nav>
      </div>

      {/* Main Content Container */}
      <div className="bg-gray-100 flex-1 flex flex-col p-6">
        <h1 className="text-gray-900 text-3xl font-bold">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <StatCard title="Total Games" value="2,845" icon={<Gamepad2 />} />
          <StatCard
            title="Total Sales"
            value="10,482"
            icon={<ShoppingCart />}
          />
          <StatCard title="Total Users" value="54,231" icon={<Users />} />
          <StatCard title="Active Users" value="2,573" icon={<Activity />} />
        </div>

        {/* Recent Sales Table */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900">Recent Sales</h2>
          <p className="text-sm text-black">
            This Month: $54,231 (+8% from last month)
          </p>
          <p className="text-gray-600 text-sm mb-4">
            You made 265 sales this month.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Order ID</th>
                  <th className="p-3 text-left">Game</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Date Purchased</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) =>
                  order.orderItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t text-gray-800 hover:bg-gray-200"
                    >
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{item.product.title}</td>
                      <td className="p-3">{order.userId}</td>
                      <td className="p-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 font-semibold">${item.price}</td>
                      <td className="p-3">{order.status || "Pending"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-950 text-white p-4 rounded-xl shadow-md flex items-center space-x-4">
      {/* Icon */}
      <div className="bg-white bg-opacity-20 p-4 rounded-full text-3xl text-white">
        {icon}
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default AdminPage;