"use client";

import {
  LayoutDashboard,
  Gamepad2,
  Layers,
  Users,
  SearchCode,
  ShoppingCart,
  Activity,
  Trash2,
  AlertCircle,
  UserPlus,
  User,
  MailIcon,
  Menu,
  X
} from "lucide-react";
import SidebarLink from "../components/SidebarLink";
import { useUser } from "../../context/user-context";
import { useEffect, useState } from "react";

function AdminUsers() {
  const { user: userObject } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    if (userObject && userObject.token) {
      setIsUserLoaded(true);
    }
  }, [userObject]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userObject && userObject.token) {
        setIsLoading(true);
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
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isUserLoaded) {
      fetchUsers();
    }
  }, [isUserLoaded, userObject]);

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      const response = await fetch(`http://51.77.110.253:3001/api/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userObject.token}`,
        },
      });

      if (response.ok) {
        // Remove user from state
        setUsers(users.filter(user => user.id !== userToDelete.id));
        setShowDeleteConfirm(false);
        setUserToDelete(null);
      } else {
        console.error("Failed to delete user:", response.statusText);
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while attempting to delete the user.");
    }
  };

 
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const newUsersCount = users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
  const adminsCount = users.filter(u => u.role === "admin").length;

  
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      <div className="md:hidden bg-[#0F0F15] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button 
          onClick={toggleMobileSidebar}
          className="text-white p-2 rounded-lg hover:bg-[#2A2A35] transition-colors"
        >
          {showMobileSidebar ? <X /> : <Menu />}
        </button>
      </div>

      
      <div className={`${showMobileSidebar ? 'block' : 'hidden'} md:block bg-[#0F0F15] text-white w-full md:w-64 flex-shrink-0 flex flex-col p-5 space-y-4 border-r border-[#2A2A35] h-full md:h-auto ${showMobileSidebar ? 'absolute z-20 top-14 left-0 right-0 bottom-0' : ''}`}>
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
        </nav>
      </div>

      {/* Main Content Container */}
      <div className="bg-[#1A1A22] flex-1 p-4 md:p-6 flex flex-col">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">User Management</h1>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          <StatCard title="Total Users" value={users.length.toString()} icon={<Users />} />
          <StatCard title="New Users (30d)" value={`+${newUsersCount}`} icon={<UserPlus />} />
          <StatCard title="Admin Users" value={adminsCount.toString()} icon={<User />} />
        </div>

        {/* Users Section */}
        <div className="bg-[#252530] border border-[#3A3A4A] p-4 md:p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">User List</h2>
              <p className="text-gray-400 text-xs md:text-sm">Manage and view all registered users</p>
            </div>

            {/* Search Input */}
            <div className="flex items-center space-x-2 bg-[#3A3A4A] px-3 py-2 rounded-full w-full sm:w-auto">
              <SearchCode className="text-[#fa9a00ef]" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-white focus:outline-none w-full"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fa9a00ef]"></div>
            </div>
          ) : (
            <>
              {}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#3A3A4A] text-gray-400">
                      <th className="text-left p-3">User ID</th>
                      <th className="text-left p-3">Full Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Role</th>
                      <th className="text-left p-3">Created At</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-[#3A3A4A] hover:bg-[#3A3A4A]/30">
                          <td className="p-3 text-white">{user.id}</td>
                          <td className="p-3 text-white">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[#3A3A4A] flex items-center justify-center text-lg mr-2">
                                {user.firstName?.[0] || ""}
                              </div>
                              {`${user.firstName || ""} ${user.lastName || ""}`}
                            </div>
                          </td>
                          <td className="p-3 text-white flex items-center">
                            <MailIcon size={14} className="mr-1 text-gray-400" />
                            {user.email}
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              user.role === 'admin' 
                                ? 'bg-[#fa9a00ef]/20 text-[#fa9a00ef]' 
                                : 'bg-blue-500/20 text-blue-500'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString()} {new Date(user.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                          <td className="p-3 text-center">
                            {user.id !== userObject.id && (
                              <button
                                onClick={() => confirmDelete(user)}
                                className="bg-red-600/20 hover:bg-red-600/30 text-red-500 p-2 rounded-full transition-colors"
                                title="Delete user"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center p-6 text-gray-400">
                          No users found matching the search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              
              <div className="md:hidden space-y-4">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className="bg-[#1A1A22] border border-[#3A3A4A] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#3A3A4A] flex items-center justify-center text-lg mr-2">
                            {user.firstName?.[0] || ""}
                          </div>
                          <div>
                            <div className="text-white font-medium">{`${user.firstName || ""} ${user.lastName || ""}`}</div>
                            <div className="text-sm text-gray-400 flex items-center">
                              <MailIcon size={12} className="mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                        {user.id !== userObject.id && (
                          <button
                            onClick={() => confirmDelete(user)}
                            className="bg-red-600/20 hover:bg-red-600/30 text-red-500 p-2 rounded-full transition-colors"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-400">
                          ID: <span className="text-white">{user.id}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'admin' 
                            ? 'bg-[#fa9a00ef]/20 text-[#fa9a00ef]' 
                            : 'bg-blue-500/20 text-blue-500'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-400">
                    No users found matching the search criteria.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#252530] border border-[#3A3A4A] p-5 rounded-lg shadow-lg w-full max-w-[400px] text-white">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            
            <p className="mb-4">
              Are you sure you want to delete the user <span className="font-semibold">{userToDelete.firstName} {userToDelete.lastName}</span>?
            </p>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently remove the user and cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Stats Card Component 
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#252530] border border-[#3A3A4A] text-white p-3 md:p-4 rounded-xl shadow-md flex items-center space-x-3 md:space-x-4">
      {/* Icon */}
      <div className="bg-[#3A3A4A] p-3 md:p-4 rounded-full text-xl md:text-3xl text-[#fa9a00ef]">
        {icon}
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">{value}</h3>
        <p className="text-xs md:text-sm font-bold text-white">{title}</p>
      </div>
    </div>
  );
}

export default AdminUsers;
