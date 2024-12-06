import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function RegisterPage() {
    return (
        <div className='flex flex-row w-full h-full justify-center relative overflow-hidden' >
            {/* Navbar */}
            <div className="relative z-50">
                <Navbar isLoggedIn={"True"} />
            </div>
            <div className='flex flex-col justify-center items-center p-10 px-52 bg-black text-white w-1/2 h-full gap-y-10 z-10 rounded-xl'>
                <h1 className='text-4xl'>Register</h1>

                <div className='flex flex-row justify-between items-center gap-x-2 w-full'>
                    <input type='text' placeholder='First Name' className='p-5 bg-transparent border-2 border-white rounded-md w-full' />
                    <input type='text' placeholder='Last Name' className='p-5 bg-transparent border-2 border-white rounded-md w-full' />

                </div>

                <input type='text' placeholder='Email' className='p-5 bg-transparent border-2 border-white rounded-md w-full' />

                <input type='text' placeholder='Password' className='p-5 bg-transparent border-2 border-white rounded-md w-full' />
                <input type='text' placeholder='Confirm Password' className='p-5 bg-transparent border-2 border-white rounded-md w-full' />

                <button className='p-5 bg-white text-black rounded-md w-full'>Login</button>
                <p>Already have an account? <Link href='/login' className='text-blue-400'>Login</Link></p>
            </div>

        </div>
    )
}

export default RegisterPage 