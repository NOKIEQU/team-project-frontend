"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RegisterPage() {
    const router = useRouter();

    // Styled components
    const input =
        "w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:border-[#FF8C00] transition-colors duration-300";
    const label =
        "text-white font-bold text-sm mb-1 block";
    const button =
        "w-full px-3 py-2 bg-[#FF8C00] text-white rounded-full font-bold hover:bg-[#FFA500] hover:shadow-[0_0_10px_rgba(255,140,0,0.5)] transition-all duration-300 transform hover:scale-[1.02]";
    const form = "w-full max-w-md p-4";

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    
    // Error handling
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const validateForm = () => {
        const newErrors = {};
        
        // Validate names
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        // Validate date of birth
        if (!day || !month || !year) {
            newErrors.dob = "Complete date of birth is required";
        } else {
            const dayNum = parseInt(day);
            const monthNum = parseInt(month);
            const yearNum = parseInt(year);
            
            if (dayNum < 1 || dayNum > 31) newErrors.day = "Invalid day";
            if (monthNum < 1 || monthNum > 12) newErrors.month = "Invalid month";
            
            const currentYear = new Date().getFullYear();
            if (yearNum < 1900 || yearNum > currentYear) {
                newErrors.year = "Invalid year";
            }
            
            // Advanced date validation (optional)
            try {
                const dateStr = `${yearNum}-${monthNum.toString().padStart(2, "0")}-${dayNum.toString().padStart(2, "0")}`;
                const date = new Date(dateStr);
                if (date.toString() === "Invalid Date") {
                    newErrors.dob = "Invalid date";
                }
            } catch (e) {
                newErrors.dob = "Invalid date format";
            }
        }
        
        // Validate password
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        
        // Validate confirm password
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            
            // Format date of birth
            const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

            const response = await fetch("http://51.77.110.253:3001/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    dob,
                    newsletter
                }),
            });

            if (response.ok) {
                // Registration successful - redirect to login page
                router.push("/login");
            } else {
                const errorData = await response.json();
                setRegisterError(errorData.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setRegisterError("An error occurred. Please try again.");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#1A1A22] flex flex-col md:flex-row overflow-hidden">
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
                        points="0,14 0,19 39,39.5 39,34.5"
                        fill="rgba(255, 140, 0, 0.15)"
                    />
                    <polygon
                        points="40,35 40,40 100,71 100,66"
                        fill="rgba(255, 140, 0, 0.1)"
                    />
                    <polygon
                        points="0,20 0,22 39,42.5 39,40.5"
                        fill="rgba(255, 140, 0, 0.15)"
                    />
                    <polygon
                        points="0,85 0,80 39,95 39,100"
                        fill="rgba(255, 140, 0, 0.15)"
                    />
                    <polygon
                        points="40,95 40,100 60,100 60,105"
                        fill="rgba(255, 140, 0, 0.1)"
                    />
                    <polygon
                        points="40,41 40,43 100,74 100,72"
                        fill="rgba(255, 140, 0, 0.1)"
                    />
                </svg>
            </div>

            {/* Character image side */}
            <div className="w-2/5 h-full relative z-0 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A22] to-transparent z-10 opacity-40"></div>
                <div className="w-full h-full relative">
                    <Image
                        src="/register.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Registration Image"
                        className="pointer-events-none"
                    />
                </div>
            </div>

            {/* Main Form Section */}
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto md:mx-auto">
                {/* Title with animated underline */}
                <div className="mb-6 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        CREATE ACCOUNT
                    </h1>
                    <div className="w-40 h-1 bg-[#FF8C00] rounded-full mx-auto transition-all hover:w-3/4"></div>
                </div>

                {/* Error message display */}
                {registerError && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white px-4 py-2 rounded-lg mb-4 w-full max-w-md">
                        <p className="text-sm font-semibold">{registerError}</p>
                    </div>
                )}

                <form className={form} onSubmit={handleRegister}>
                    {/* Names */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className={label}>First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={`${input} ${errors.firstName ? "border-red-500" : ""}`}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className={label}>Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={`${input} ${errors.lastName ? "border-red-500" : ""}`}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className={label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={`${input} ${errors.email ? "border-red-500" : ""}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-4">
                        <label className={label}>Date of Birth</label>
                        <div className="flex gap-3">
                            <div className="w-1/3">
                                <input
                                    type="number"
                                    placeholder="Day"
                                    min="1"
                                    max="31"
                                    className={`${input} ${errors.day || errors.dob ? "border-red-500" : ""}`}
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <input
                                    type="number"
                                    placeholder="Month"
                                    min="1"
                                    max="12"
                                    className={`${input} ${errors.month || errors.dob ? "border-red-500" : ""}`}
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-1/3">
                                <input
                                    type="number"
                                    placeholder="Year"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className={`${input} ${errors.year || errors.dob ? "border-red-500" : ""}`}
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {errors.dob && (
                            <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className={label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`${input} ${errors.password ? "border-red-500" : ""}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                        <p className="text-gray-400 text-xs mt-1">Password must be at least 8 characters long</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4">
                        <label className={label}>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className={`${input} ${errors.confirmPassword ? "border-red-500" : ""}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Newsletter checkbox */}
                    <div className="flex items-center mb-5">
                        <input
                            type="checkbox"
                            id="newsletter"
                            className="mr-2 transform scale-125 cursor-pointer accent-[#FF8C00]"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                        />
                        <label
                            htmlFor="newsletter"
                            className="text-white text-sm cursor-pointer"
                        >
                            I would like to receive news and promotional messages from GameVault.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`${button} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                    </button>

                    {/* Footer */}
                    <p className="mt-4 text-white text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#FF8C00] hover:text-[#FFA500] transition-colors duration-300 underline font-bold text-sm"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;