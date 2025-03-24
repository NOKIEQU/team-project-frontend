"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Layers,
  Warehouse,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
  ChevronDown,
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminOrders() {
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(null);

  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userObject && userObject.token) {
        try {
          const response = await fetch("http://51.77.110.253:3001/api/orders/all", {
            headers: {
              Authorization: `Bearer ${userObject.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setOrders(data);
          } else {
            console.error("Failed to fetch orders:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    if (isUserLoaded) {
      fetchOrders();
    }
  }, [isUserLoaded, userObject]);

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => {
    const orderPrice = order && order.totalPrice ? parseFloat(order.totalPrice) : 0;
    return sum + (isNaN(orderPrice) ? 0 : orderPrice);
  }, 0);

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!userObject || !userObject.token) return;
    
    setStatusUpdating(orderId);
    try {
      const response = await fetch(`http://51.77.110.253:3001/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userObject.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update order status:", response.statusText);
        alert("Failed to update order status. Please try again.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status. Please try again.");
    } finally {
      setStatusUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'PENDING':
        return 'bg-[#fa9a00ef]/20 text-[#fa9a00ef]';
      case 'PROCESSING':
        return 'bg-blue-500/20 text-blue-500';
      case 'SHIPPED':
        return 'bg-purple-500/20 text-purple-500';
      case 'DELIVERED':
        return 'bg-green-500/20 text-green-500';
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-[#0F0F15] text-white w-64 flex flex-col p-5 space-y-4 border-r border-[#2A2A35]">
        <nav className="space-y-2">
          <SidebarLink
            href="/admin"
            icon={<LayoutDashboard className="text-[#fa9a00ef]" />}
            text="Dashboard"
          />
          <SidebarLink 
            href="/adminGames" 
            icon={<Gamepad2 className="text-[#fa9a00ef]" />} 
            text="Games" 
          />
          <SidebarLink 
            href="/adminUsers" 
            icon={<Users className="text-[#fa9a00ef]" />} 
            text="Users" 
          />
          <SidebarLink 
            href="/adminGenres" 
            icon={<Layers className="text-[#fa9a00ef]" />} 
            text="Genres" 
          />
          <SidebarLink 
            href="/adminOrders" 
            icon={<ShoppingCart className="text-[#fa9a00ef]" />} 
            text="Orders" 
          />
          <SidebarLink 
          href="/adminInventory" 
          icon={<Warehouse className="text-[#fa9a00ef]" />} 
          text="Inventory" 
          />
        </nav>
      </div>

      <div className="bg-[#1A1A22] flex-1 flex flex-col p-6">
        <h1 className="text-white text-3xl font-bold mb-6">Order Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <StatCard title="Total Orders" value={orders.length.toString()} icon={<ShoppingCart />} />
          <StatCard title="Total Revenue" value={`£${totalRevenue.toFixed(2)}`} icon={<Activity />} />
        </div>

        {/* Orders Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Order List</h2>
              <p className="text-gray-400 text-sm">View and manage all platform orders</p>
            </div>

            <div className="flex items-center space-x-2 bg-[#3A3A4A] px-4 py-2 rounded-full">
              <SearchCode className="text-[#fa9a00ef]" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3A3A4A]">
                  <th className="text-left p-3 text-gray-400">Order ID</th>
                  <th className="text-left p-3 text-gray-400">User</th>
                  <th className="text-left p-3 text-gray-400">Email</th>
                  <th className="text-left p-3 text-gray-400">Total Price</th>
                  <th className="text-left p-3 text-gray-400">Date</th>
                  <th className="text-left p-3 text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                      <td className="p-3 text-white">{order.id}</td>
                      <td className="p-3 text-white">{order.user?.firstName} {order.user?.lastName}</td>
                      <td className="p-3 text-white">{order.user?.email}</td>
                      <td className="p-3 text-white">£{parseFloat(order.totalPrice).toFixed(2)}</td>
                      <td className="p-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-3">
                        <div className="relative">
                          <button 
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center ${getStatusColor(order.status)}`}
                            onClick={() => document.getElementById(`dropdown-${order.id}`).classList.toggle('hidden')}
                            disabled={statusUpdating === order.id}
                          >
                            {statusUpdating === order.id ? 'Updating...' : order.status}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </button>
                          <div 
                            id={`dropdown-${order.id}`} 
                            className="absolute z-50 mt-1 w-40 bg-[#252530] border border-[#3A3A4A] rounded-lg shadow-lg hidden right-0"
                          >
                            {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                              <button
                                key={status}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  order.status === status ? 'bg-[#3A3A4A]' : 'hover:bg-[#3A3A4A]/50'
                                } text-white first:rounded-t-lg last:rounded-b-lg`}
                                onClick={() => {
                                  document.getElementById(`dropdown-${order.id}`).classList.add('hidden');
                                  if (order.status !== status) {
                                    updateOrderStatus(order.id, status);
                                  }
                                }}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-gray-400">
                      No orders found matching the search criteria.
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

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#252530] border border-[#3A3A4A] text-white p-4 rounded-xl shadow-md flex items-center space-x-4">
      <div className="bg-[#3A3A4A] p-4 rounded-full text-3xl text-[#fa9a00ef]">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-semibold">{value}</h3>
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default AdminOrders;