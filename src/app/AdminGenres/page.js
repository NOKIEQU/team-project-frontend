"use client";

import Link from "next/link";
import { SearchCode } from 'lucide-react';
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
import SidebarLink from "../components/SidebarLink";

function AdminGenres() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-[#111827] text-white w-64 flex flex-col p-5 space-y-4">
        <nav className="space-y-2">
          <SidebarLink href="/admin" icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarLink href="/AdminGames" icon={<Gamepad2 />} text="Games" />
          <SidebarLink href="/AdminUsers" icon={<BarChart />} text="Users" />
          <SidebarLink href="/AdminGenres" icon={<Layers />} text="Genres" />
        </nav>
      </div>


      {/* Main content */}

      
      <div className="bg-gray-100 flex-1 p-6 flex flex-col relative">

{/* Title */}
<h1 className="text-gray-900 text-3xl font-bold">Genres</h1>

{/* Search Bar Section */}
<div className="bg-[#1F2937] text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
  <SearchCode className="text-xl" />
  <input
    type="text"
    placeholder="Search for genres..."
    className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
  />
</div>

{/* Add Genre Button positioned top-right */}
<div className="absolute top-6 right-6">
  <button className="bg-[#111827] text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all">
    Add Genre
  </button>
</div>



     

        {/* Genres Table */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Genres List</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Genre ID</th>
                  <th className="p-3 text-left">Genre Name</th>
                  <th className="p-3 text-left">Number of Games</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#101", name: "Action", numGames: 50 },
                  { id: "#102", name: "Adventure", numGames: 30 },
                  { id: "#103", name: "Strategy", numGames: 20 },
                  { id: "#104", name: "RPG", numGames: 40 },
                  { id: "#105", name: "Shooter", numGames: 25 }
                ].map((genre, index) => (
                  <tr key={index} className="border-t text-gray-800 hover:bg-gray-50">
                    <td className="p-3">{genre.id}</td>
                    <td className="p-3">{genre.name}</td>
                    <td className="p-3">{genre.numGames}</td>
                    <td className="p-3">
                      <button className="bg-[#111827] text-white py-1 px-4 rounded-lg text-sm">Edit</button>
                    </td>
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

export default AdminGenres;
