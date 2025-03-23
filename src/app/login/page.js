"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/user-context';

export default function LoginPage() {
    const [Popup, setPopup] = useState(false);
    const [ThankYou, setThankYou] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [popupEmail, setPopupEmail] = useState('');
    const [popupEmailError, setPopupEmailError] = useState('');

    const router = useRouter();
    const { user, login } = useUser();

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

    const submitLogin = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            checkLogin(email, password)
        } else {
            setEmailError('Please enter a valid email address.');
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const checkLogin = async (email, password) => {
        try {
            const response = await fetch(`http://51.77.110.253:3001/api/users/login`, {
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
            // Handle successful login, e.g., save token, redirect, etc.
            login(data);
            router.push('/');   
            
            console.log('Login successful:', data);
        } catch (error) {
            console.error('Error during login:', error);
            // Handle login error, e.g., show error message
        }
    };

    return (
      <div className="relative h-screen bg-[#1A1A22] text-white flex font-oswald">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-3/5 h-full z-10 pointer-events-none overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full bg-[#FF8C00] filter blur-[100px] opacity-20 animate-pulse top-1/4 -right-48"></div>
 
        </div>

        {/* Enhanced geometric overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <polygon
              points="0,14 0,19 38,39.5 38,34.5"
              fill="rgba(255, 140, 0, 0.15)"
            />
            <polygon
              points="39,35 39,40 100,71 100,66"
              fill="rgba(255, 140, 0, 0.1)"
            />
            <polygon
              points="0,20 0,22 38,42.5 38,40.5"
              fill ="rgba(255, 140, 0, 0.15) "
            />
            <polygon
              points="39,41 39,43 100,74 100,72"
              fill="rgba(255, 140, 0, 0.1)"
            />
            <polygon
              points="0,85 0,80 38,95 38,100"
              fill="rgba(255, 140, 0, 0.15)"
            />
            <polygon
              points="39,95 39,100 60,100 60,105"
              fill="rgba(255, 140, 0, 0.1)"
            />
           
            <polygon
              points="39,41 39,43 100,74 100,72"
              fill="rgba(255, 140, 0, 0.1)"
            />
          </svg>
        </div>

        {/* Character image side */}
        <div className="w-2/5 h-full relative z-0 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A22] to-transparent z-10 opacity-40"></div>
          <Image
            src="/login.png"
            layout="fill"
            objectFit="cover"
            alt="Login Side Image"
            className="pointer-events-none"
          />
        </div>

        {/* Login form */}
        <div
          className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto 
            md:border-r-4 md:border-[#1A1A22] "
        >
          <h1 className="text-4xl font-bold text-center mb-2">
            LOGIN TO ACCOUNT
          </h1>
          <div className="w-40 h-1 bg-[#FF8C00] rounded-full mb-6 mx-auto transition-all hover:w-2/5"></div>
          <form
            className="flex flex-col space-y-4 w-full max-w-md"
            onSubmit={(e) => {
              submitLogin(e);
            }}
          >
            <div className="group">
              <label htmlFor="email" className="block text-sm font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white 
                            placeholder-white focus:border-[#FF8C00] transition-colors duration-300"
                placeholder="Enter your email"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div className="group">
              <label htmlFor="password" className="block text-sm font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white 
                            placeholder-white focus:border-[#FF8C00] transition-colors duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#FF8C00]" />{" "}
                Remember me
              </label>
              <button
                type="button"
                onClick={ForgottenPasswordOpen}
                className="text-[#FF8C00] hover:text-[#FFA500] transition-colors duration-300 underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
            <button
              className="w-full px-3 py-2 bg-[#FF8C00] text-white rounded-full font-bold 
                        hover:bg-[#FFA500] hover:shadow-[0_0_10px_rgba(255,140,0,0.5)] 
                        transition-all duration-300 transform hover:scale-[1.02]"
            >
              LOGIN TO ACCOUNT
            </button>
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#FF8C00] hover:text-[#FFA500] transition-colors duration-300 underline font-bold text-sm"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>

        {/* Forgotten password popup */}
        {Popup && (
          <div className="fixed inset-0 bg-[#1A1A22] bg-opacity-90 flex items-center justify-center z-50 pointer-events-auto backdrop-blur-sm">
            <div className="bg-[#1A1A22] p-6 rounded-lg border border-[#FF8C00] shadow-[0_0_15px_rgba(255,140,0,0.3)] w-full max-w-sm z-40">
              {ThankYou ? (
                <>
                  <h2 className="text-lg font-bold text-white text-center mb-2">
                    Thank You!
                  </h2>
                  <div className="w-20 h-0.5 bg-[#FF8C00] mb-4 mx-auto"></div>
                  <p className="text-sm text-white text-center">
                    A password reset link has been sent to your email.
                  </p>
                  <button
                    className="w-full mt-4 p-2 bg-[#FF8C00] text-black rounded-full font-bold 
                                    hover:bg-[#FFA500] transition-colors duration-300"
                    onClick={ForgottenPasswordClose}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Reset Password
                  </h2>
                  <div className="w-20 h-0.5 bg-[#FF8C00] mb-4"></div>
                  <p className="text-sm text-white">
                    Enter your email to receive a reset link.
                  </p>
                  <input
                    type="email"
                    value={popupEmail}
                    onChange={(e) => setPopupEmail(e.target.value)}
                    className="w-full px-3 py-2 mt-2 bg-transparent border-b-2 border-white text-sm outline-none 
                                    text-white placeholder-white focus:border-[#FF8C00] transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                  {popupEmailError && (
                    <p className="text-red-500 text-sm">{popupEmailError}</p>
                  )}
                  <div className="flex justify-between mt-4">
                    <button
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full flex-1 mr-2 transition-colors duration-300"
                      onClick={ForgottenPasswordClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="p-2 bg-[#FF8C00] text-black rounded-full flex-1 font-bold 
                                        hover:bg-[#FFA500] transition-colors duration-300"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
}
