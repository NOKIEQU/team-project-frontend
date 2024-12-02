import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function LoginPage() {
    return (
        <div className='flex flex-row w-full h-full relative overflow-hidden' >
            <div className='flex flex-col justify-center items-center p-10 bg-black text-white w-1/2 h-full gap-y-10 z-10 rounded-xl'>
                <h1 className='text-4xl'>Welcome Back!</h1>
                <input type='text' placeholder='Email' className='p-5 bg-transparent border-2 border-white rounded-md w-1/2'/>
                <input type='text' placeholder='Password' className='p-5 bg-transparent border-2 border-white rounded-md w-1/2'/>
                <button className='p-5 bg-white text-black rounded-md w-1/2'>Login</button>
                <p>Don't have an account? <Link href='/register' className='text-blue-400'>Register</Link></p>
                <p>Forgot your password? <Link href='/reset-password' className='text-blue-400'>Reset</Link></p>
            </div>
           
        </div>
    )
}

export default LoginPage 