"use client";

import { useState } from "react";

function RegisterPage() {

    const input =
        "w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:ring-0";
    const label =
        "text-white font-bold text-sm mb-1 block";
    const button =
        "w-full px-3 py-2 bg-[#FF8C00] text-white rounded-full font-bold hover:bg-[#FFA500] hover:shadow-[0_0_10px_rgba(255,140,0,0.5)] transition-all duration-300 transform hover:scale-[1.02]";
   
    const form = "w-full max-w-md p-4 ";
    


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const dob = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

      try {
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
          }),
        });

        if (response.ok) {
          alert("Registration successful!");
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    };
  

    return (
        <div className="relative min-h-screen md:h-screen bg-[#1A1A22] flex flex-col md:flex-row overflow-hidden">
                    <div className="absolute w-96 h-96 rounded-full bg-[#FF8C00] filter blur-[100px] opacity-20 animate-pulse top-1/4 -right-48"></div>

            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none hidden md:block">
            <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className="w-full h-full"
>
    <polygon
        points="0,14 0,19 39,39.5 39,34.5"
        fill="#FF8C00"
        fill-opacity="0.1"
    />
    <polygon
        points="40,35 40,40 100,71 100,66"
        fill="#FF8C00"
        fill-opacity="0.3"
    />
    <polygon
        points="0,20 0,22 39,42.5 39,40.5"
        fill="#FF8C00"
        fill-opacity="0.1"
    />
    <polygon
        points="0,85 0,80 39,95 39,100"
        fill="#FF8C00"
        fill-opacity="0.1"
    />
    <polygon
        points="40,95 40,100 60,100 60,105"
        fill="#FF8C00"
        fill-opacity="0.3"
    />
    <polygon
        points="0,86 0,88 39,103 39,101"
        fill="#FF8C00"
        fill-opacity="0.1"
    />
    <polygon
        points="40,41 40,43 100,74 100,72"
        fill="#FF8C00"
        fill-opacity="0.2"
    />
</svg>

            </div>

            <div className="w-2/5 h-full relative z-0 hidden md:block">
                <img
                    src="/"
                    alt="Background"
                    className="layout-fill h-full object-cover"
                />
            </div>

            {/* Main Form Section */}
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto max-w-[900px] ml-[120px]  flex-grow overflow-hidden">
                {/* Title with Underline */}
                <h1 className="text-4xl font-bold text-center text-white z-30 pb-2 relative mb-2">
                    CREATE ACCOUNT
                    <div className="w-40 h-1 bg-[#FF8C00] rounded-full mb-6 mx-auto transition-all hover:w-3/4"></div>
                </h1>
                

                <form className={form}>
                    {/* Names */}
                    <div className="flex gap-4 mb-3">
                      <div className="flex-1">
                        <label className={label}>First Name</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className={input}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className={label}>Last Name</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className={input}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className={label}>Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className={input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className={label}>Date of Birth</label>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          placeholder="Day"
                          min="1"
                          max="31"
                          className={`${input} w-1/3`}
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Month"
                          min="1"
                          max="12"
                          className={`${input} w-1/3`}
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Year"
                          min="1900"
                          max={new Date().getFullYear()}
                          className={`${input} w-1/3`}
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                      <label className={label}>Password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className={input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                      <label className={label}>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className={input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center mb-3">
                        <input
                            type="checkbox"
                            id="newsletter"
                            className="mr-2 transform scale-125 cursor-pointer"
                        />
                        <label
                            htmlFor="newsletter"
                            className="text-white text-sm"
                        >
                            I would like to receive news and promotional messages from GameVault.
                        </label>
                    </div>

                    {/* Submit Button */}
                    <a href="/page.js">
                    
                    <button type="submit"  className={button} onClick={handleRegister}>
                      CREATE ACCOUNT
                    </button>
                    </a>

                    {/* Footer */}
                    <p className="mt-4 text-white text-center text-sm">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-[#FF8C00] hover:text-[#FFA500] transition-colors duration-300 underline font-bold text-sm"
                        >
                            Login
                        </a>
                    </p>
                </form>
            </div>

        </div>
    );
}

export default RegisterPage;