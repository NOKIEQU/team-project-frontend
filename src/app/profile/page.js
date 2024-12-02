import React from 'react'
import Navbar from '../components/navbar'

function ProfilePage() {
  return (
    <div>
      <Navbar isLoggedIn={true}/>
    <div className='flex flex-row w-full h-full'>
     
        
      <div className='bg-slate-50 w-1/4 h-full p-10 text-right'>
        <h1 className='text-5xl font-semibold mb-10'>Welcome, everyone!</h1>
        <div className='flex flex-col w-full h-full gap-y-10'>
          <button className='p-5 text-gray-500 text-lg text-right rounded-md w-full'>Personal Information</button>
          <button className='p-5 text-gray-500 text-lg text-right rounded-md w-full'>Payment Information</button>
          <button className='p-5 text-red-500 text-lg text-right rounded-md w-full'>Logout</button>

        </div>
      </div>
      <div className='flex flex-col w-3/4 h-full p-10'>
        <div>
          <h1 className='text-3xl m-auto mb-10'>Personal Information</h1>
          <div className='flex flex-col gap-y-10'>
            <input type='text' placeholder='First Name' className='p-4 border-2  rounded-md w-1/3' />
            <input type='text' placeholder='Last Name' className='p-4 border-2  rounded-md w-1/3' />
            <input type='text' placeholder='Email' className='p-4 border-2  rounded-md w-1/3' />
            <input type='text' placeholder='Phone Number' className='p-4 border-2  rounded-md w-1/3' />

            <div className='flex flex-row gap-x-10 w-1/3'>
              <button className='p-4 bg-transparent text-gray-500 rounded-md w-1/2'>Reset Password</button>
              <button className='p-4 bg-gray-500 text-white rounded-md w-1/2'>Save</button>

            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage 