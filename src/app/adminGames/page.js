"use client";

import Link from "next/link";
import { SearchCode } from "lucide-react";
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
import SidebarLink from "../components/SidebarLink";

function AdminGames() {
  return (
    <div className="flex min-h-screen relative">

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

      {/* Main Content Section */}
      <div className="bg-gray-100 flex-1 p-6 flex flex-col relative">

        {/* Add Genre Button positioned top-right */}
        <div className="absolute top-6 right-6">
          <button className="bg-blue-500 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all">
            Add Games
          </button>
        </div>

        <h1 className="text-gray-900 text-3xl font-bold">Games</h1>
      
        {/* Search Bar Section */}
        <div className="bg-[#1F2937] text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
          <SearchCode className="text-xl" />
          <input
            type="text"
            placeholder="Search for games..."
            className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
          />
        </div>

        {/* Games List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

          {/* Game Card 1 */}
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>  <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Rocket League </h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
          <div className="bg-[#1F2937] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">Cyberpunk 2077</h3>
            <p className="text-sm text-gray-400">Genre:</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold">$69.99</p>
              <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm">Edit</button>
            </div>
          </div>
        


       

        </div>
      </div>
    </div>
  );
}

export default AdminGames;
