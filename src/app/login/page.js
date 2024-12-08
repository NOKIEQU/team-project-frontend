"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function LoginPage() {
    // Email checking & popup window
    const [Popup, setPopup] = useState(false);
    const [ThankYou, setThankYou] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [popupEmail, setPopupEmail] = useState("");
    const [popupEmailError, setPopupEmailError] = useState("");

    // Forgotten password
    const ForgottenPasswordOpen = () => {
        setPopup(true);
        setThankYou(false);
        setPopupEmail("");
        setPopupEmailError("");
    };

    const ForgottenPasswordClose = () => {
        setPopup(false);
        setThankYou(false);
    };

    const Submitt = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            // Add your login functionality here
        } else {
            setEmailError("Please enter a valid email address.");
        }
    };

    const PopupSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(popupEmail)) {
            setThankYou(true);
        } else {
            setPopupEmailError("Please enter a valid email address.");
        }
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const EmailChecker = (e) => {
        setEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setEmailError("");
        }
    };

    const PopupEmailChecker = (e) => {
        setPopupEmail(e.target.value);
        if (validateEmail(e.target.value)) {
            setPopupEmailError("");
        }
    };

    return (
        <div className="h-screen bg-cover bg-center relative">
            {/* Background image */}
            <Image
                src="/back.gif"
                layout="fill"
                className="object-cover"
                alt="Background Image"
            />

            <div className="absolute inset-0 bg-[#0d1b2a] bg-opacity-80"></div>

            <div className="relative z-10 grid w-full h-full grid-cols-1 md:grid-cols-3 font-sans">
          

                {/* Orange Box */}
                <div className="bg-[#f6a302] flex flex-col p-4 absolute top-0 right-0 md:relative md:top-auto md:right-auto md:col-span-1 md:h-auto h-[25vh] z-0 [clip-path:polygon(100%_0%,_0%_0%,_0%_100%,_80%_100%)]">
                    <div className="absolute inset-0">
                        <Image
                            src="/back3.jpg"
                            layout="fill"
                            className="object-cover hidden md:block"
                            alt="Background Image"
                        />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-white text-xl md:text-2xl font-bold mb-4">Welcome</h3>
                    </div>
                </div>

                {/* Login Form */}
                <div className="w-full mt-[22vh] sm:mt-[22vh] md:mt-[30vh] md:ml-[17vw] flex justify-center md:col-span-1">
                    <form
                        className="flex flex-col items-center space-y-4 w-full md:w-[600px]"
                        onSubmit={Submitt}
                    >
                        <div className="flex items-center justify-center mt-12 md:mt-0">
                            <h1 className="text-4xl text-white font-bold border-b-2 border-[#f6a302]">
                                LOGIN
                            </h1>
                        </div>

                        <div className="flex flex-col items-start sm:mt-2 mt-4 md:mt-6">
                            <label htmlFor="email" className="text-white text-lg">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={EmailChecker}
                                className="mt-2 p-2 w-full md:w-[600px] bg-transparent border-b-2 border-[#f6a302] focus:outline-none focus:border-[#f6a302] text-white"
                                placeholder="Enter your email"
                                required
                            />
                            {emailError && (
                                <p className="text-red-500 text-sm mt-2">{emailError}</p>
                            )}
                        </div>

                        <div className="flex flex-col items-start sm:mt-2 mt-4 md:mt-6">
                            <label htmlFor="password" className="text-white text-lg">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="mt-2 p-2 w-full md:w-[600px] bg-transparent border-b-2 border-[#f6a302] focus:outline-none focus:border-[#f6a302] text-white"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center w-full md:w-[600px] mt-4 px-6 md:px-0">
                            <div className="flex items-center text-white">
                                <input type="checkbox" id="rememberme" className="mr-2" />
                                <label htmlFor="rememberme" className="text-sm">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm text-[#f6a302]">
                                <button
                                    type="button"
                                    onClick={ForgottenPasswordOpen}
                                    className="hover:underline"
                                >
                                    Forgotten Password?
                                </button>
                            </div>
                        </div>

                        <button className="mt-4 p-2 w-[80%] sm:w-full md:w-[600px] bg-[#f6a302] text-white rounded-md hover:bg-[#fa9a00ef]">
                            LOGIN
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-white">
                                Don't have an account?{" "}
                                <Link href="/register">
                                    <span className="text-[#f6a302] hover:underline">
                                        Sign up here
                                    </span>
                                </Link>
                            </p>
                            <br />
                            
                        </div>
                    </form>
                </div>

                {/* Popup Window */}
                {Popup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-[#0d1b2a] p-4 sm:p-6 w-full max-w-[90%] sm:max-w-sm border border-[#f6a302] rounded-md">
                            {ThankYou ? (
                                <div className="text-center">
                                    <h2 className="text-lg font-bold mb-4 text-white sm:text-xl">
                                        Thank You!
                                    </h2>
                                    <p className="text-sm sm:text-base mb-4 text-white">
                                        A password reset link has been sent to your email.
                                    </p>
                                    <button
                                        className="bg-[#f6a302] text-white px-4 py-2 rounded hover:bg-[#fa9a00ef] w-full"
                                        onClick={ForgottenPasswordClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-lg font-bold mb-4 text-white sm:text-xl">
                                        Reset Password
                                    </h2>
                                    <p className="text-sm sm:text-base mb-4 text-white">
                                        Please enter your email address. We will send you a link to
                                        reset your password.
                                    </p>
                                    <input
                                        type="email"
                                        value={popupEmail}
                                        onChange={PopupEmailChecker}
                                        placeholder="Enter your email"
                                        className="w-full p-2 bg-transparent border-b-2 border-[#f6a302] focus:outline-none focus:border-[#f6a302] text-white mb-4"
                                        required
                                    />
                                    {popupEmailError && (
                                        <p className="text-red-500 text-sm mt-2">
                                            {popupEmailError}
                                        </p>
                                    )}
                                    <div className="flex justify-between space-x-2">
                                        <button
                                            className="bg-[#f6a302] text-white px-4 py-2 rounded hover:bg-[#fa9a00ef] flex-1"
                                            onClick={ForgottenPasswordClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-[#f6a302] text-white px-4 py-2 rounded hover:bg-[#fa9a00ef] flex-1"
                                            onClick={PopupSubmit}
                                        >
                                            Send
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
