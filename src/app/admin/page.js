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
      {/* Sidebar - Changed to a darker color */}
      <div className="bg-[#0F0F15] text-white w-64 flex flex-col p-5 space-y-4 border-r border-[#2A2A35]">
        <nav className="space-y-2">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard className="text-[#fa9a00ef]" />}
            text="Dashboard"
          />
          <SidebarLink href="/adminGames" icon={<Gamepad2 className="text-[#fa9a00ef]" />} text="Games" />
          <SidebarLink href="/adminUsers" icon={<BarChart className="text-[#fa9a00ef]" />} text="Users" />
          <SidebarLink href="/adminGenres" icon={<Layers className="text-[#fa9a00ef]" />} text="Genres" />
          <SidebarLink href="/adminOrders" icon={<Layers className="text-[#fa9a00ef]" />} text="Orders" />
        </nav>
      </div>

      <div className="bg-[#1A1A22] flex-1 flex flex-col p-6">
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>

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

        {/* Recent Activity Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-6 mt-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <p className="text-gray-400 text-sm mb-6">
            Monitor the latest activities across your platform
          </p>

          <div className="flex flex-col items-center justify-center py-10">
            <Activity size={48} className="text-[#3A3A4A] mb-4" />
            <p className="text-gray-400 text-center">
              No activity to display yet. Activity will appear here when users interact with your platform.
            </p>
            <button className="mt-6 bg-[#fa9a00ef] hover:bg-[#e08800] px-6 py-2 text-white rounded-full font-medium transition-all duration-300">
              Refresh Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#252530] border border-[#3A3A4A] text-white p-4 rounded-xl shadow-md flex items-center space-x-4">
      {/* Icon */}
      <div className="bg-[#3A3A4A] p-4 rounded-full text-3xl text-[#fa9a00ef]">
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