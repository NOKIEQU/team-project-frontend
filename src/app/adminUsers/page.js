"use client";

import Link from "next/link";
import { LayoutDashboard, Gamepad2, BarChart, Layers } from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { SearchCode } from "lucide-react";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminUsers() {

const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [users, setUsers] = useState([]);

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

    fetchUsers();
  }, [userObject]);

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
        </nav>
      </div>
      {/* Main content */}
    
      <div className="bg-gray-100 flex-1 p-6 flex flex-col">
        <h1 className="text-gray-900 text-2xl font-bold">User List</h1>

        {/* Search Bar Section */}
        <div className="bg-gray-950 text-white w-full p-4 mt-4 rounded-lg flex items-center space-x-2">
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
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t text-gray-800 hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
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
