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
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  // Check if the user is loaded
  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  // Fetch all necessary data when the user is loaded
  useEffect(() => {
    const fetchAllData = async () => {
      if (!userObject || !userObject.token) {
        console.error("User is not authenticated. Cannot fetch data.");
        return;
      }

      setIsLoading(true);
      
      try {
        // Fetch orders
        const ordersResponse = await fetch("http://51.77.110.253:3001/api/orders", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!ordersResponse.ok) {
          throw new Error(`Failed to fetch orders: ${ordersResponse.statusText}`);
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
        
        // Fetch games/products
        const gamesResponse = await fetch("http://51.77.110.253:3001/api/products", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!gamesResponse.ok) {
          throw new Error(`Failed to fetch games: ${gamesResponse.statusText}`);
        }

        const gamesData = await gamesResponse.json();
        setGames(gamesData);
        
        // Fetch users
        const usersResponse = await fetch("http://51.77.110.253:3001/api/users/all", {
          headers: {
            Authorization: `Bearer ${userObject.token}`,
          },
        });

        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.statusText}`);
        }

        const usersData = await usersResponse.json();
        setUsers(usersData);
        
        // Generate recent activity by combining the most recent orders and user registrations
        const recentOrders = ordersData.slice(0, 5).map(order => ({
          type: 'order',
          id: order.id,
          date: new Date(order.createdAt),
          details: `Order #${order.id} - ${order.totalItems} items - £${order.total.toFixed(2)}`,
          user: order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest'
        }));
        
        const recentUsers = usersData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map(user => ({
            type: 'user',
            id: user.id,
            date: new Date(user.createdAt),
            details: `New user registered`,
            user: `${user.firstName} ${user.lastName}`
          }));
        
        // Combine and sort by date
        const combinedActivity = [...recentOrders, ...recentUsers]
          .sort((a, b) => b.date - a.date)
          .slice(0, 10);
        
        setRecentActivity(combinedActivity);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isUserLoaded) {
      fetchAllData();
    }
  }, [isUserLoaded, userObject]);



  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-[#0F0F15] text-white w-64 flex flex-col p-5 space-y-4 border-r border-[#2A2A35]">
          <nav className="space-y-2">
            <SidebarLink
              href="/admin"
              icon={<LayoutDashboard className="text-[#fa9a00ef]" />}
              text="Dashboard"
            />
            <SidebarLink href="/adminGames" icon={<Gamepad2 className="text-[#fa9a00ef]" />} text="Games" />
            <SidebarLink href="/adminUsers" icon={<Users className="text-[#fa9a00ef]" />} text="Users" />
            <SidebarLink href="/adminGenres" icon={<Layers className="text-[#fa9a00ef]" />} text="Genres" />
            <SidebarLink href="/adminOrders" icon={<ShoppingCart className="text-[#fa9a00ef]" />} text="Orders" />
          </nav>
        </div>

        <div className="bg-[#1A1A22] flex-1 flex flex-col p-6">
          <h1 className="text-white text-3xl font-bold">Dashboard</h1>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fa9a00ef]"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <StatCard title="Total Games" value={games.length.toString()} icon={<Gamepad2 />} />
                <StatCard
                  title="Total Orders"
                  value={orders.length.toString()}
                  icon={<ShoppingCart />}
                />
                <StatCard title="Total Users" value={users.length.toString()} icon={<Users />} />
                <StatCard 
                  title="Total Revenue" 
                  value={`£${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`} 
                  icon={<BarChart />} 
                />
              </div>

              {/* Recent Activity Section */}
              <div className="bg-[#252530] border border-[#3A3A4A] p-6 mt-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>

                {recentActivity.length > 0 ? (
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#3A3A4A]">
                          <th className="text-left p-3 text-gray-400">Date</th>
                          <th className="text-left p-3 text-gray-400">User</th>
                          <th className="text-left p-3 text-gray-400">Activity</th>
                          <th className="text-left p-3 text-gray-400">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentActivity.map((activity, index) => (
                          <tr key={`${activity.type}-${activity.id}`} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                            <td className="p-3 text-gray-400">{activity.date.toLocaleDateString()} {activity.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                            <td className="p-3 text-white">{activity.user}</td>
                            <td className="p-3 text-white">{activity.details}</td>
                            <td className="p-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                activity.type === 'order' 
                                  ? 'bg-[#fa9a00ef]/20 text-[#fa9a00ef]' 
                                  : 'bg-blue-500/20 text-blue-500'
                              }`}>
                                {activity.type === 'order' ? 'Order' : 'Registration'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Activity size={48} className="text-[#3A3A4A] mb-4" />
                    <p className="text-gray-400 text-center">
                      No activity to display yet. Activity will appear here when users interact with your platform.
                    </p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-6 bg-[#fa9a00ef] hover:bg-[#e08800] px-6 py-2 text-white rounded-full font-medium transition-all duration-300"
                    >
                      Refresh Activity
                    </button>
                  </div>
                )}
              </div>


            </>
          )}
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