"use client";
import Navbar from "../components/navbar";

function RegisterPage() {
    const input =
        "w-full px-3 py-2 bg-transparent border-b-2 border-white text-sm outline-none text-white placeholder-white focus:ring-0";
    const label =
        "text-white font-bold text-sm mb-1 block";
    const button =
        "w-full py-2 bg-white text-black rounded-full font-bold text-base transition-colors duration-300 hover:bg-white shadow-md";
    const form =
        "flex-2 flex flex-col items-center p-6 z-20 relative pointer-events-auto font-oswald";

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
                        fill="rgba(255, 255, 255, 0.8)"
                    />
                    <polygon
                        points="39,35 39,40 100,71 100,66"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                    <polygon
                        points="0,20 0,22 38,42.5 38,40.5"
                        fill="rgba(255, 255, 255, 0.8)"
                    />
                    <polygon
                        points="39,41 39,43 100,74 100,72"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                    <polygon
                        points="0,85 0,80 38,95 38,100"
                        fill="rgba(255, 255, 255, 0.8)"
                    />
                    <polygon
                        points="39,95 39,100 60,100 60,105"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                    <polygon
                        points="0,86 0,88 38,103 38,101"
                        fill="rgba(255, 255, 255, 0.8)"
                    />
                    <polygon
                        points="39,41 39,43 100,74 100,72"
                        fill="rgba(255, 255, 255, 0.3)"
                    />
                </svg>
            </div>

           
            <div className="w-2/5 h-full relative z-0 hidden md:block">
                <img src="/loginpic.jpg" alt="Background" className="w-full h-full object-cover"/>
            </div>

        

            
            <div className="w-full md:w-3/5 flex flex-col items-center justify-center p-6 z-20 relative pointer-events-auto md:border-r-4 md:border-black md:shadow-xl md:mr-8 pt-28">

             
                <h1 className="text-4xl font-bold text-center mb-2 text-white underline z-30">CREATE ACCOUNT</h1>

              
                
                <form className="w-full max-w-md">
                
                    <div className="flex gap-4 mb-3">
                        <div className="flex-1">
                            <label className={label}>First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className={input}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className={label}>Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className={input}
                                required
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label className={label}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className={input}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className={label}>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={input}
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-3">
                        <label className={label}>Date of Birth</label>
                        <div className="flex gap-3">
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
                    <div className="mb-3">
                        <label className={label}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={input}
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
                            required
                        />
                    </div>

                    {/* Optional Checkbox */}
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
                    <button type="submit" className={button}>
                        CREATE ACCOUNT
                    </button>

                    {/* Footer */}
                    <p className="mt-4 text-white text-center text-sm">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-white font-bold underline"
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
