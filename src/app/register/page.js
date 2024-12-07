"use client";

import { useState } from "react";
import { useUser } from "../../context/user-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/navbar";
import Image from "next/image";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { register } = useUser();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await register(formData);
      router.push("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const input =
    "w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none";
  const label = "text-white font-bold text-sm mb-1 block";
  const button =
    "w-full py-3 bg-[#f6a302] text-[#323232] rounded-full font-bold text-lg transition-colors duration-300 hover:bg-[#e08c00] mb-5";
  const form = "flex-2 flex flex-col items-center p-8 ml-5";

  return (
    <div className="flex flex-col font-sans bg-[#0d1b2a] min-h-screen">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar isLoggedIn={"True"} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Left Side of Page */}
        <div className="flex-[1.8] relative overflow-hidden flex justify-start items-center text-white">
          <img
            src="/left-background.png"
            alt="Left Side"
            className="absolute top-0 left-0 h-full w-full z-10 object-cover"
            style={{
              clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
            }}
          />
          <div className="absolute top-0 right-0 w-full h-full z-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <polygon
                points="77.5,0 85,0 65,100 55,100"
                fill="rgba(255, 165, 0, 0.4)"
              />
              <polygon
                points="90,0 100,0 80,100 70,100"
                fill="rgba(255, 165, 0, 0.8)"
              />
            </svg>
          </div>
          <div className="relative z-30 p-8 max-w-lg">
            <h1 className="text-4xl font-bold mb-5 text-white">
              WE ARE ON <span className="text-[#f6a302]">TOP</span> OF OUR GAMES
            </h1>
            <p className="text-lg leading-7 text-white">
              Join us for endless excitement and unforgettable gaming
              adventures.
            </p>
          </div>
        </div>

        {/* Right Side of Page */}
        <div className={form}>
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            CREATE ACCOUNT
          </h2>
          <div className="w-24 h-1 bg-[#f6a302] mx-auto mb-6"></div>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {/* Names */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className={label}>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={input}
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className={label}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={input}
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className={label}>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className={input}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className={label}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={input}
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className={label}>Date of Birth</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  className={`${input} w-1/3`}
                  required
                />
                <input
                  type="number"
                  placeholder="Month"
                  min="1"
                  max="12"
                  className={`${input} w-1/3`}
                  required
                />
                <input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`${input} w-1/3`}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className={label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className={input}
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className={label}>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className={input}
                required
              />
            </div>

            {/* Optional Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="newsletter"
                className="mr-2 transform scale-125 cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-white text-sm">
                I would like to receive news and promotional messages from
                GameVault.
              </label>
            </div>

            <Link href={'/Questionnaire'}>
            <button
              type="submit"
              className={`${button}  flex items-center justify-center space-x-2`}
            >
              <span className="align-middle">TAKE QUIZ</span>
              <Image
                src="/right-arrow.png"
                alt="Right Arrow"
                width={20}
                height={20}
                className="inline-block"
              />
            </button>
            </Link>

            {/* Submit Button */}
         

            <button type="submit" className={button}>
              CREATE ACCOUNT
            </button>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Footer */}
            <p className="mt-4 text-white text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-[#f6a302] font-bold underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
