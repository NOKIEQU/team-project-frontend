'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'

function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: 'Lilly',
    lastName: 'Joshua',
    email: 'lillyjoshua.@gmail.com',
    phone: '+44 76 765 970',
    age: '30',
    address: '123 letus Street',
    city: 'Birmingham',
    postcode: 'B18 9AA'
  });
  const [showNotification, setShowNotification] = useState(false);
  const [imagePreview, setImagePreview] = useState("/account/profilepic.png");
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleSave = () => {
    console.log('Saving updated profile:', formData);
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

  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-12 overflow-auto bg-[#1a1a22] relative">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-[#FFA800] text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center">
          <span className="mr-2">✓</span>
          Email sent to reset password!
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <div className="bg-[#F0ECEC]/10 p-2 rounded-full">
            <Image 
              src="/account/profilepic.png"  
              alt="Profile Icon"
              width={56}
              height={56}
              className="rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-white">My Profile</h1>
        </div>
        
        <div className="flex justify-center mb-20">
          <div className="bg-[#F0ECEC] rounded-2xl shadow-2xl p-10 lg:p-14 w-full max-w-3xl">
            <div className="flex flex-col items-center mb-12">
              <div className="relative group cursor-pointer mb-4" onClick={handleImageClick}>
                <div className="absolute -inset-2 bg-[#FFA800]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <Image 
                  src={imagePreview}
                  alt="Profile Icon"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-sm font-medium">Change Photo</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
            </div>

            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A22]">Profile Information</h2>
            
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">First Name</label>
                <input 
                  type='text' 
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder='First Name' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Last Name</label>
                <input 
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder='Last Name' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Email</label>
                <input 
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Email' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Phone Number</label>
                <input 
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='Phone Number' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Age</label>
                <input 
                  type='number'
                  name='age'
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder='Age' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Address</label>
                <input 
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder='Address' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">City</label>
                <input 
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder='City' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <label className="text-lg font-medium text-[#1A1A22]">Postcode</label>
                <input 
                  type='text'
                  name='postcode'
                  value={formData.postcode}
                  onChange={handleInputChange}
                  placeholder='Postcode' 
                  className='p-4 bg-white border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#FFA800]/50 transition-all duration-300 hover:border-[#FFA800]/30' 
                />
              </div>

              <div className='flex flex-row gap-x-4 mt-8'>
                <button 
                  onClick={handleResetPassword}
                  className='p-5 bg-[#1A1A22] text-white rounded-xl w-1/2 font-semibold shadow-md 
                  hover:bg-[#2C2C35] hover:shadow-lg transition-all duration-300'
                >
                  Reset Password
                </button>
                <button 
                  onClick={handleSave}
                  className='p-5 bg-[#1A1A22] text-white rounded-xl w-1/2 font-semibold shadow-md 
                  hover:bg-[#2C2C35] hover:shadow-lg transition-all duration-300'
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage