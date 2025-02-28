"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';

export default function LoginPage() {
    const [Popup, setPopup] = useState(false);
    const [ThankYou, setThankYou] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [popupEmail, setPopupEmail] = useState('');
    const [popupEmailError, setPopupEmailError] = useState('');

    const ForgottenPasswordOpen = () => {
        setPopup(true);
        setThankYou(false);
        setPopupEmail('');
        setPopupEmailError('');
    };

    const ForgottenPasswordClose = () => {
        setPopup(false);
        setThankYou(false);
    };

    const Submitt = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
        } else {
            setEmailError('Please enter a valid email address.');
        }
    };

    const PopupSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(popupEmail)) {
            setThankYou(true);
        } else {
            setPopupEmailError('Please enter a valid email address.');
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    return (
        <div className="relative h-screen bg-[#1A1A22] text-white flex font-oswald">

        
            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden md:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                >
                    <polygon
                        points="0,14 0,19 38,39.5 38,34.5"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <polygon
                        points="39,35 39,40 100,71 100,66"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="0,20 0,22 38,42.5 38,40.5"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <polygon
                        points="39,41 39,43 100,74 100,72"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="0,85 0,80 38,95 38,100"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <polygon
                        points="39,95 39,100 60,100 60,105"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                    <polygon
                        points="0,86 0,88 38,103 38,101"
                        fill="rgba(255, 255, 255, 0.5)"
                    />
                    <polygon
                        points="39,41 39,43 100,74 100,72"
                        fill="rgba(255, 255, 255, 0.1)"
                    />
                </svg>
            </div>

            
            <div className="w-2/5 h-full relative z-0 hidden md:block">
                <Image src="/loginpic.jpg" layout="fill" objectFit="cover" alt="Login Side Image" className="pointer-events-none" />
            </div>

           

           
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto 
            md:border-r-4 md:border-black md:shadow-xl md:mr-8">
                <h1 className="text-4xl font-bold text-center mb-2">LOGIN TO ACCOUNT</h1>
                <div className="w-40 h-0.5 bg-white mb-6 mx-auto"></div> 
                <form className="flex flex-col space-y-4 w-full max-w-md" onSubmit={Submitt}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:ring-0"
                            placeholder="Enter your email"
                            required
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold">Password</label> 
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:ring-0"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex justify-between text-sm"> 
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <button type="button" onClick={ForgottenPasswordOpen} className="underline text-sm">Forgot Password?</button> 
                    </div>
                    <button className="w-full px-3 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 text-sm">LOGIN TO ACCOUNT</button> 
                    <p className="text-center text-sm">Don't have an account? <Link href="/register" className="underline font-bold text-sm">Sign up here</Link></p> 
                </form>
            </div>

           
            {Popup && (
                <div className="fixed inset-0 bg-[#1A1A22] bg-opacity-75 flex items-center justify-center z-50 pointer-events-auto">
                    <div className="bg-[#1A1A22] p-6 rounded shadow-lg w-full max-w-sm z-40">
                        {ThankYou ? (
                            <>
                                <h2 className="text-lg font-bold text-white text-center">Thank You!</h2>
                                <p className="text-sm text-white text-center">A password reset link has been sent to your email.</p>
                                <button className="w-full mt-4 p-2 bg-gray-700 rounded hover:bg-gray-600 text-white" onClick={ForgottenPasswordClose}>Close</button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-lg font-bold text-white">Reset Password</h2>
                                <p className="text-sm text-white">Enter your email to receive a reset link.</p>
                                <input
                                    type="email"
                                    value={popupEmail}
                                    onChange={(e) => setPopupEmail(e.target.value)}
                                    className="w-full px-3 py-2 mt-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:ring-0 text-sm outline-none shadow-md "
                                    placeholder="Enter your email"
                                    required
                                />
                                {popupEmailError && <p className="text-red-500 text-sm">{popupEmailError}</p>}
                                <div className="flex justify-between mt-4">
                                    <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex-1 mr-2" onClick={ForgottenPasswordClose}>Cancel</button>
                                    <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex-1" onClick={PopupSubmit}>Submit</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};
