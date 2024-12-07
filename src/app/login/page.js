'use client'

import { useState } from 'react';
import { useUser } from '../../context/user-context';
import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://51.77.110.253:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            login(data.user);
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials or try again later.');
        }
    };

    return (

        <div className="grid w-full h-full grid-cols-1 bg-[#16202a] md:grid-cols-3 relative">

            {/* Orange box, top right for mobile, left side for desktop */}

            <div
                className="bg-orange-400 flex flex-col p-4 absolute top-0 right-0 md:relative md:top-auto md:right-auto md:col-span-1 md:h-auto h-[25vh] z-0"
                style={{
                    clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 80% 100%)',
                }}
            >
                {/* inside orange box */}
                <div className="relative z-10"> {/* meant to display text*/}
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-4  ">Welcome</h3>

                </div>

                {/* game image hidden on mobile but shown for laptop*/}
                <div className="relative w-full h-full">
                    <Image
                        src="/halo2.png"
                        layout="fill"

                        className="object-cover hidden md:block"
                        alt="Logo"
                    />

                </div>
            </div>

            {/* remaining part of the screen will be login form. Controls the placement for phone and desktop version*/}
            <div className="w-full mt-[22vh] sm:mt-[22vh] md:mt-[30vh] md:ml-[17vw] flex justify-center md:col-span-1">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full md:w-[600px]">

                    {/* Title of form = Login*/}
                    <div className="flex items-center justify-center mt-12 md:mt-0">
                        <h1 className="text-4xl text-white font-bold border-b-2 border-orange-400">
                            LOGIN
                        </h1>
                    </div>

                    {/* Input Box for email */}
                    <div className="flex flex-col items-start sm:mt-2 mt-4 md:mt-6">
                        <label htmlFor="email" className="text-white text-lg">Email</label>
                        <input
                            id="email-address"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-2 p-2 w-full md:w-[600px] bg-transparent border-b-2 border-orange-400 focus:outline-none focus:border-orange-400 text-white"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Input Box for Password */}
                    <div className="flex flex-col items-start sm:mt-2 mt-4 md:mt-6">
                        <label htmlFor="password" className="text-white text-lg">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-2 p-2 w-full md:w-[600px] bg-transparent border-b-2 border-orange-400 focus:outline-none focus:border-orange-400 text-white"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Displays Remember me with check box*/}
                    <div className="flex justify-between w-full md:w-[600px] items-center mt-4">
                        <div className="flex items-center text-white">
                            <input
                                type="checkbox"
                                id="rememberme"
                                className="mr-2"
                            />
                            <label htmlFor="rememberme" className="text-sm">Remember me</label>
                        </div>
                        {/* displays Forgotten Password */}
                        <div className="text-sm text-orange-400">
                            <a href="#" className="hover:underline">Forgotten Password?</a>
                        </div>
                    </div>

                    {/* Form Button */}
                    <button type="submit" className="mt-4 p-2 w-full md:w-[600px] bg-orange-400 text-white rounded-md">
                        LOGIN
                    </button>
                    
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    {/* Sign up option */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-white">




                            Don't have an account?{' '}
                            <Link href="/register">  {/* register page link*/}
                                <span className="text-orange-400 hover:underline">Sign up here</span>
                            </Link>

                        </p>
                        <br />
                        <p className="text-sm text-white">




                            Admin?{' '}
                            <Link href="/admin">  {/* register page link*/}
                                <span className="text-orange-400 hover:underline">Click this link</span>
                            </Link>

                        </p>

                    </div>
                </form>
            </div>

        </div>

    );
}