'use client'
import React, { useState } from 'react'
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

  return (
    <div className="min-h-screen w-full px-4 md:px-8 overflow-auto bg-[#16202a] relative">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-yellow-400 text-black px-6 py-3 rounded-md shadow-lg">
          Email sent to reset password!
        </div>
      )}
      
      <div className="flex items-center gap-4 py-8">
        <Image 
          src="/account/profilepic.png"  
          alt="Profile Icon"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-3xl font-bold text-yellow-400">My Profile</h1>
      </div>
      
      <div className="flex justify-center items-start gap-8">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md h-fit">
          <h2 className="text-2xl font-semibold text-center mb-6">My Points</h2>
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <span className="font-medium">Current Points</span>
              <span className="text-xl font-bold text-yellow-500">50</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <span className="font-medium">Level</span>
              <span className="text-xl font-bold text-yellow-400">Gold</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
              <span className="font-medium">Points to Next Level</span>
              <span className="text-xl font-bold text-yellow-400">50</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-semibold text-center mb-8">Profile Information</h1>
          
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input 
                type='text' 
                name='firstName'
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder='First Name' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder='Last Name' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input 
                type='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Email' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                placeholder='Phone Number' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <input 
                type='number'
                name='age'
                value={formData.age}
                onChange={handleInputChange}
                placeholder='Age' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input 
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                placeholder='Address' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input 
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                placeholder='City' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-sm font-medium text-gray-700">Postcode</label>
              <input 
                type='text'
                name='postcode'
                value={formData.postcode}
                onChange={handleInputChange}
                placeholder='Postcode' 
                className='p-4 border-2 rounded-md w-full' 
              />
            </div>

            <div className='flex flex-row gap-x-4 mt-4'>
              <button 
                onClick={handleResetPassword}
                className='p-4 bg-yellow-400 text-black border-2 border-gray-300 rounded-md w-1/2 hover:bg-blue-600'
              >
                Reset Password
              </button>
              <button 
                onClick={handleSave}
                className='p-4 bg-yellow-400 text-black rounded-md w-1/2 hover:bg-blue-600'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage