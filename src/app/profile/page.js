import React from 'react'
import Navbar from '../components/navbar'
import CardForAccount from "../components/cardForAccount"
import Image from 'next/image'

function AccountPage() {
  return (
    <div>
      
      <div className='flex flex-row w-full h-full'>


        <div className="min-h-screen w-full px-4 md:px-8 overflow-auto bg-[#1a1a22]">
          <div className="flex items-center gap-4 py-8">
            <Image
              src="/account/account.png"
              alt="Account Icon"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-3xl font-bold text-[#ffffff]">My Account</h1>
          </div>
          <div className="pb-16">
            <CardForAccount />
          </div>

        </div>
      </div>
      </div>
      )
}

      export default AccountPage