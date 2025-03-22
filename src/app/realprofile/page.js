'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/user-context'
import { useCart } from '../../context/cart-context'
import {
  ShoppingBag, CreditCard, Shield, UserCircle, Package,
  Settings, ChevronRight, LogOut, Info, MessageSquare,
  Zap, Share2, Heart, Crown
} from 'lucide-react'
 
function AccountPage() {
  const router = useRouter();
  const { user, logout } = useUser();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [showNotification, setShowNotification] = useState(false);
  const [imagePreview, setImagePreview] = useState("/account/profilepic.png");
  const fileInputRef = useRef(null);
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
 
  useEffect(() => {
    console.log("Raw user object from context:", user);
   
    if (user) {
      const userData = user.user || user;
      console.log("Using user data structure:", userData);
     
      setFormData(prev => ({
        ...prev,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || ''
      }));
     
      console.log("Form data after update:", formData);
    }
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
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
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
 
  // Get user display name for welcome message
  const getDisplayName = () => {
    if (!user) return 'Guest';
   
    // Try different possible structures
    const userData = user.user || user;
    return userData.firstName || userData.username || userData.email?.split('@')[0] || 'User';
  };
 
  const orders = [];
 
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
      description: cart.length > 0 ? 'View your order history' : 'You haven\'t placed any orders yet',
      count: orders.length,
      onClick: () => setActiveTab('orders')
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Manage your payment options',
      onClick: () => setActiveTab('payment')
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
        <div className="fixed top-4 right-4 bg-[#FFA800] text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center">
          <span className="mr-2">✓</span>
          Profile updated successfully!
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
                    className={`w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#2C2C38] transition-colors ${
                      activeTab === card.id ? 'bg-[#2C2C38] border-l-4 border-[#FFA800]' : ''
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
                    router.push('/'); // This will redirect to home page after logout
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
                 
                  <div className="flex justify-end">
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
                  <div className="divide-y divide-[#3A3A4A]">
                    {/* Order list would go here */}
                    <p>You have {orders.length} orders.</p>
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
           
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-[#252530] rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
               
                <div className="text-center py-16">
                  <div className="mx-auto w-20 h-20 bg-[#3A3A4A] rounded-full flex items-center justify-center mb-4">
                    <CreditCard size={32} className="text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No payment methods yet</h3>
                  <p className="text-gray-400 mb-6">Add a payment method for faster checkout.</p>
                  <button className="px-6 py-3 bg-[#FFA800] text-white rounded-lg font-semibold hover:bg-[#e08800] transition-colors">
                    Add Payment Method
                  </button>
                </div>
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
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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