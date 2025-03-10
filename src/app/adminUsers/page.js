"use client";

import Link from "next/link";
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { SearchCode } from "lucide-react";

function AdminUsers() {
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
      {/* Main content */}
    
      <div className="bg-gray-100 flex-1 p-6 flex flex-col">
        <h1 className="text-gray-900 text-2xl font-bold">User List</h1>


          {/* Search Bar Section */}
          <div className="bg-[#1F2937] text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
          <SearchCode className="text-xl" />
          <input
            type="text"
            placeholder="Search for users.."
            className="bg-transparent border-b-2 border-white text-white focus:outline-none w-full"
          />
        </div>

        {/* Users Data Table */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-lg">
      
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>  
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Username</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#101", username: "john_doe", email: "john.doe@example.com", role: "Admin", date: "01/15/2024" },
                  { id: "#102", username: "jane_smith", email: "jane.smith@example.com", role: "Admin", date: "02/12/2024" },
                  { id: "#103", username: "samuel_jones", email: "samuel.jones@example.com", role: "User", date: "03/02/2024" },
                  { id: "#104", username: "mary_rose", email: "mary.rose@example.com", role: "User", date: "03/05/2024" },
                  { id: "#105", username: "GeorgeAssmiss", email: "GGeroge2005@example.com", role: "User", date: "03/01/2024" },
                  { id: "#106", username: "MohammedSumbil", email: "liam.williams@example.com", role: "User", date: "03/01/2024" },
                  { id: "#107", username: "liam_williams", email: "liam.williams@example.com", role: "User", date: "03/01/2024" },
                  { id: "#108", username: "liam_williams", email: "liam.williams@example.com", role: "User", date: "03/01/2024" }

                ].map((user, index) => (
                  <tr key={index} className="border-t text-gray-800 hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{user.date}</td>
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

export default AdminUsers;
