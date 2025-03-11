"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function loginPage() {
    const [popup, setpopup] = useState(false);
    const [thankyou, setthankyou] = useState(false);
    const [email, setemail] = useState('');
    const [emailerror, setemailerror] = useState('');
    const [popupemail, setpopupemail] = useState('');
    const [popupemailerror, setpopupemailerror] = useState('');

    const forgottenpasswordopen = () => {
        setpopup(true);
        setthankyou(false);
        setpopupemail('');
        setpopupemailerror('');
    };

    const forgottenpasswordclose = () => {
        setpopup(false);
        setthankyou(false);
    };

 
    const submitt = (e) => {
        e.preventDefault();  
        if (validateemail(email)) {
     
        } else {
            setemailerror('Please enter a valid email address.');
        }
    };

    const popupsubmit = (e) => {
        e.preventDefault();  
        if (validateemail(popupemail)) {
            setthankyou(true);
        } else {
            setpopupemailerror('Please enter a valid email address.');
        }
    };

    const validateemail = (email) => {
        const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailpattern.test(email);
    };

    return (
        <div className="relative h-screen bg-[#1A1A22] text-white flex font-oswald">

            {/* Background container */}
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden md:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <polygon
                        points="0,14 0,19 38,39.5 38,34.5"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="39.2,35 39.2,40 100,71 100,66"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                    <polygon
                        points="0,20 0,22 38,42.5 38,40.5"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="0,85 0,80 38,95 38,100"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="39.2,95 39.2,100 60,100 60,105"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                    <polygon
                        points="0,86 0,88 38,103 38,101"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="39.2,41 39.2,43 100,74 100,72"
                        fill="rgba(255, 255, 255, 0.2)"
                    />
                </svg>
            </div>

            {/* Background image container */}
            <div className="w-2/5 h-full relative z-0 hidden md:block">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <Image src="/loginpic30.jpg" layout="fill" objectFit="cover" alt="Login Side Image" className="pointer-events-none" />
            </div>

            {/* Main content */}
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto md:mr-8">

                {/* Form container */}
                <div className="w-full max-w-md p-6 bg-[#1A1A22] bg-opacity-90 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-center mb-4">LOGIN TO ACCOUNT</h1>
                    <div className="w-48 h-0.5 bg-white mb-8 mx-auto"></div>

                    <form className="flex flex-col space-y-6 w-full" onSubmit={submitt}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-bold">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                className="w-full px-4 py-2 bg-transparent border-b-2 border-white text-base outline-none text-white placeholder-white focus:ring-0"
                                placeholder="Enter your email"
                                required
                            />
                            {emailerror && <p className="text-red-500 text-sm">{emailerror}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-lg font-bold">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-2 bg-transparent border-b-2 border-white text-base outline-none text-white placeholder-white focus:ring-0"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="flex justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" /> Remember me
                            </label>
                            <button type="button" onClick={forgottenpasswordopen} className="underline text-sm">Forgot Password?</button>
                        </div>
                        <button className="w-full px-4 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 text-base">LOGIN TO ACCOUNT</button>
                        <p className="text-center text-sm">Don't have an account? <Link href="/register" className="underline text-sm">Sign up here</Link></p>
                    </form>
                </div>
            </div>

            {/* Popup */}
            {popup && (
                <div className="fixed inset-0 bg-[#1A1A22] bg-opacity-75 flex items-center justify-center z-50 pointer-events-auto">
                    <div className="bg-[#1A1A22] p-6 rounded shadow-lg w-full max-w-sm z-40">
                        {thankyou ? (
                            <>
                                <h2 className="text-lg font-bold text-white text-center">Thank You!</h2>
                                <p className="text-sm text-white text-center">A password reset link has been sent to your email.</p>
                                <button className="w-full mt-4 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white" onClick={forgottenpasswordclose}>Close</button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-white">Reset Password</h2>
                                <p className="text-sm text-white">Enter your email to receive a reset link.</p>
                                <input
                                    type="email"
                                    value={popupemail}
                                    onChange={(e) => setpopupemail(e.target.value)}
                                    className="w-full px-3 py-2 mt-2 bg-transparent border-b-2 border-white text-base outline-none text-white placeholder-white shadow-md "
                                    placeholder="Enter your email"
                                    required
                                />
                                {popupemailerror && <p className="text-red-500 text-sm">{popupemailerror}</p>}
                                <div className="flex justify-between mt-4">
                                    <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex-1 mr-2" onClick={forgottenpasswordclose}>Cancel</button>
                                    <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex-1" onClick={popupsubmit}>Submit</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

