'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/user-context'
import { useCart } from '../../context/cart-context'
import {
  ShoppingBag, Shield, UserCircle, Package,
  ChevronRight, LogOut, AlertCircle,
  Zap, Heart,
  Trash2
} from 'lucide-react'

function AccountPage() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const [imagePreview, setImagePreview] = useState("/account/profilepic.png");
  const fileInputRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      const userData = user.user || user;

      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || ''
      }));
    }
  }, [user]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.token) {
        try {
          const response = await fetch("http://51.77.110.253:3001/api/orders", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          const formattedOrders = data.map((order) => ({
            id: order.id,
            date: new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            game: order.orderItems.map((item) => item.product.title).join(", "),
            price: `£${order.totalPrice}`,
            payment: "Paid with GameVault Points",
            status: order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase(),
            image: order.orderItems[0]?.product.imageUrls[0] || "/placeholder.jpg",
            details: `Order contains ${order.orderItems.length} item(s).`,
            orderItems: order.orderItems
          }));
          setOrders(formattedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving updated profile:', formData);
    showNotificationMessage('Profile updated successfully!', 'success');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const toggleOrderDetails = (id) => {
    setExpandedOrder(id === expandedOrder ? null : id);
  };

  // Get user display name for welcome message
  const getDisplayName = () => {
    if (!user) return 'Guest';

    const userData = user.user || user;
    return userData.firstName || userData.username || userData.email?.split('@')[0] || 'User';
  };

  // Display notification
  const showNotificationMessage = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      if (user && user.token && user.id) {
        const response = await fetch(`http://51.77.110.253:3001/api/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          showNotificationMessage('Account deleted successfully. Redirecting...', 'success');

          // Delay logout to show the notification
          setTimeout(() => {
            logout();
            router.push('/');
          }, 2000);
        } else {
          const errorData = await response.json();
          showNotificationMessage(errorData.message || 'Failed to delete account', 'error');
        }
      } else {
        showNotificationMessage('Authentication required', 'error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      showNotificationMessage('An error occurred. Please try again.', 'error');
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  async function handleDeleteOrder (e, id) {
    e.preventDefault();
    try {
      
      const response = await fetch(`http://51.77.110.253:3001/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      showNotificationMessage('Order returned successfully!', 'success');

    } catch (error) {
      console.error('Error deleting order:', error);
      showNotificationMessage('An error occurred. Please try again.', 'error');
    }
  }

  // Account cards
  const accountCards = [
    {
      id: 'profile',
      title: 'My Profile',
      icon: <UserCircle className="w-6 h-6" />,
      description: 'Manage your personal information',
      onClick: () => setActiveTab('profile')
    },
    {
      id: 'orders',
      title: 'My Orders',
      icon: <Package className="w-6 h-6" />,
      description: orders.length > 0 ? 'View your order history' : 'You haven\'t placed any orders yet',
      count: orders.length,
      onClick: () => setActiveTab('orders')
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield className="w-6 h-6" />,
      description: 'Update your password and security settings',
      onClick: () => setActiveTab('security')
    }
  ];


  return (
    <div className="min-h-screen bg-[#1a1a22] text-white">
      {showNotification && (
        <div className={`fixed top-4 right-4 ${notificationType === 'success' ? 'bg-[#FFA800]' : 'bg-red-500'} text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center`}>
          <span className="mr-2">{notificationType === 'success' ? '✓' : '!'}</span>
          {notificationMessage}
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#252530] border border-[#3A3A4A] p-6 rounded-lg shadow-lg w-[400px] text-white">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl font-bold">Delete Account</h2>
            </div>

            <p className="mb-4">
              Are you sure you want to delete your account? This action <span className="font-bold">cannot be undone</span>.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              All of your data including order history, personal information, and saved preferences will be permanently deleted.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-[#3A3A4A] hover:bg-[#4A4A5A] text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-[#252530] border-b border-[#3A3A4A]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="absolute -inset-1 bg-[#FFA800]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-[#FFA800]"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-xs">Change</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome, {getDisplayName()}
              </h1>
              <p className="text-gray-400 mt-1">{formData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="bg-[#252530] rounded-xl overflow-hidden shadow">
              <div className="divide-y divide-[#3A3A4A]">
                {accountCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={card.onClick}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#2C2C38] transition-colors ${activeTab === card.id ? 'bg-[#2C2C38] border-l-4 border-[#FFA800]' : ''
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${activeTab === card.id ? 'text-[#FFA800]' : 'text-gray-400'}`}>
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{card.title}</h3>
                        <p className="text-sm text-gray-400">{card.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                ))}

                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-[#2C2C38] transition-colors text-red-400 hover:text-red-300"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

          </div>

          <div className="md:w-2/3 lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#252530] rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#3A3A4A]">
                    <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">New Password</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full p-3 rounded-lg border border-[#3A3A4A] bg-[#1A1A22] text-white focus:border-[#FFA800] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-x-2">
                 
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-[#FFA800] text-white rounded-lg font-semibold hover:bg-[#e08800] transition-colors"
                    >
                      Save Changes
                    </button>
                    
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-[#252530] rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>

                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order, k) => (
                      <div key={order.id} className="bg-[#1A1A22] border border-[#3A3A4A] p-4 rounded-lg shadow-md hover:border-[#FFA800] transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <img src={order.image} alt={order.game} className="w-16 h-16 rounded-md object-cover" />
                            <div>
                              <p className="text-sm text-gray-400">{order.date}</p>
                              <p className="text-lg font-semibold">Order: GV-{new Date(order.date).getDate()}-{new Date(order.date).getMonth()}-{new Date(order.date).getFullYear()}-{order.id.substring(order.id.length - 15, 5).toUpperCase()}</p>
                              <p className="text-sm text-gray-400">Order ID: {order.id}</p>
                              <p className="text-md font-bold mt-1">{order.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold mb-2 ${order.status === "Completed"
                                ? "bg-green-500/20 text-green-400"
                                : order.status === "Pending"
                                  ? "bg-[#FFA800]/20 text-[#FFA800]"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}>
                              {order.status}
                            </span>
                            <button
                              onClick={() => toggleOrderDetails(order.id)}
                              className="text-sm text-[#FFA800] hover:text-[#e08800] transition-colors"
                            >
                              {expandedOrder === order.id ? "Hide Details" : "View Details"}
                            </button>
                          </div>
                        </div>

                        {expandedOrder === order.id && (
                          <div className="mt-4 pt-4 border-t border-[#3A3A4A]">
                            <h3 className="text-lg font-medium mb-3">Order Details</h3>
                            <div className="space-y-3">
                              {order.orderItems && order.orderItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={item.product.imageUrls?.[0] || "/placeholder.jpg"}
                                      alt={item.product.title}
                                      className="w-12 h-12 rounded object-cover"
                                    />
                                    <div>
                                      <p className="font-medium">{item.product.title}</p>
                                      <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="font-medium">£{item.price}</p>
                                </div>
                              ))}

                              <div className="flex justify-between pt-3 border-t border-[#3A3A4A]">
                                <p className="font-medium">Total</p>
                                <p className="font-bold">{order.price}</p>
                              </div>

                              <div className="flex flex-row justify-between items-center text-sm text-gray-400 pt-2">
                                <div className=''>
                                  {/* <p>Payment Method: {order.payment}</p> */}
                                  <p>Order Status: {order.status}</p>

                                </div>
                                <div className='flex flex-row gap-x-2'><Trash2 className='text-red-400' size={20}/><button onClick={(e) => {handleDeleteOrder(e, order.id)}} className='text-red-400'>Return Item </button></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="mx-auto w-20 h-20 bg-[#3A3A4A] rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                    <Link href="/shop">
                      <button className="px-6 py-3 bg-[#FFA800] text-white rounded-lg font-semibold hover:bg-[#e08800] transition-colors">
                        Browse Games
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-[#252530] rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                <div className="space-y-6">
                  <div className="p-4 border border-[#3A3A4A] rounded-lg hover:border-[#FFA800] transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <p className="text-gray-400 text-sm">Receive emails about your account, purchases and special offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFA800]"></div>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-[#3A3A4A] rounded-lg hover:border-[#FFA800] transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-[#3A3A4A] text-white rounded-lg hover:bg-[#4A4A5A] transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border border-[#3A3A4A] rounded-lg hover:border-red-500 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">Delete Account</h3>
                        <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                      </div>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage