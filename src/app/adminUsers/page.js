"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Gamepad2,
  BarChart,
  Layers,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminUsers() {
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userObject && userObject.token) {
        try {
          const response = await fetch("http://51.77.110.253:3001/api/users/all", {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUsers(data);
          } else {
            console.error("Failed to fetch users:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    if (isUserLoaded) {
      fetchUsers();
    }
  }, [isUserLoaded, userObject]);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Styled like the AdminPage */}
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

      {/* Main Content Container - Styled like the AdminPage */}
      <div className="bg-[#1A1A22] flex-1 flex flex-col p-6">
        <h1 className="text-white text-3xl font-bold mb-6">User Management</h1>

        {/* Users Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <StatCard title="Total Users" value={users.length.toString()} icon={<Users />} />
          <StatCard title="Last 30 Days" value={`+${users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}`} icon={<Activity />} />
        </div>

        {/* Users Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">User List</h2>
              <p className="text-gray-400 text-sm">Manage and view all registered users</p>
            </div>

            {/* Search Input */}
            <div className="flex items-center space-x-2 bg-[#3A3A4A] px-4 py-2 rounded-full">
              <SearchCode className="text-[#fa9a00ef]" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3A3A4A]">
                  <th className="text-left p-3 text-gray-400">User ID</th>
                  <th className="text-left p-3 text-gray-400">Full Name</th>
                  <th className="text-left p-3 text-gray-400">Email</th>
                  <th className="text-left p-3 text-gray-400">Role</th>
                  <th className="text-left p-3 text-gray-400">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                      <td className="p-3 text-white">{user.id}</td>
                      <td className="p-3 text-white">{`${user.firstName} ${user.lastName}`}</td>
                      <td className="p-3 text-white">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'admin' 
                            ? 'bg-[#fa9a00ef]/20 text-[#fa9a00ef]' 
                            : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-400">
                      No users found matching the search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component (identical to AdminPage)
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

export default AdminUsers;