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

function AdminPage() {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="bg-[#111827] text-white w-64 flex flex-col p-5 space-y-4">
        <nav className="space-y-2">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard />}
            text="Dashboard"
          />
          <SidebarLink href="/AdminGames" icon={<Gamepad2 />} text="Games" />
          <SidebarLink href="/AdminUsers" icon={<BarChart />} text="Users" />
          <SidebarLink href="/AdminGenres" icon={<Layers />} text="Genres" />
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
  <p className="text-sm text-black">This Month: $54,231 (+8% from last month)</p>
  <p className="text-gray-600 text-sm mb-4">You made 265 sales this month.</p>
  
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="p-3 text-left">Order ID</th>
          <th className="p-3 text-left">Game</th>
          <th className="p-3 text-left">Customer</th>
          <th className="p-3 text-left">Date Purchased</th> {/* Moved Column */}
          <th className="p-3 text-left">Amount</th> {/* Amount is now the last column */}
        </tr>
      </thead>
      <tbody>
        {[ 
          { id: "#3210", game: "Cyberpunk 2077", customer: "Ethan Scott", amount: "$69.99", date: "2025-03-01" },
          { id: "#3209", game: "The Witcher 3", customer: "Liam Davis", amount: "$39.99", date: "2025-02-28" },
          { id: "#3208", game: "Assassin's Creed Valhalla", customer: "Ava Brown", amount: "$59.99", date: "2025-03-02" },
          { id: "#3207", game: "Red Dead Redemption 2", customer: "Gareth Bale", amount: "$49.99", date: "2025-02-25" },
          { id: "#3206", game: "Minecraft", customer: "Sophia Williams", amount: "$26.95", date: "2025-03-03" },
        ].map((sale, index) => (
          <tr key={index} className="border-t text-gray-800 hover:bg-gray-200">
            <td className="p-3">{sale.id}</td>
            <td className="p-3">{sale.game}</td>
            <td className="p-3">{sale.customer}</td>
            <td className="p-3">{sale.date}</td> {/* Moved Column */}
            <td className="p-3 font-semibold">{sale.amount}</td> {/* Amount is now the last column */}
          </tr>
        ))}
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
    <div className="bg-[#1F2937] text-white p-4 rounded-xl shadow-md flex items-center space-x-4">
      {/* Icon */}
      <div className="bg-white bg-opacity-20 p-4 rounded-full text-3xl text-white">
        {icon}
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-3xl font-semibold">{value}</h3>
        <p className="text-sm font-bold text-white">{title}</p>
      </div>

      {/* Optional Sub Stats */}
      <div className="ml-6 text-sm text-white">
        <p>Sub Stat 1: 1,245</p>
      </div>
    </div>
  );
}

export default AdminPage;
