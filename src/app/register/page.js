"use client";

function RegisterPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-[#1c1c1c]">
            <div className="flex flex-1">
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
                            Join us for endless excitement and unforgettable gaming adventures.
                        </p>
                    </div>
                </div>
                <div className="flex-2 flex flex-col items-center p-8 ml-5">
                    <h2 className="text-white text-2xl font-bold mb-4 text-center">
                        CREATE ACCOUNT
                    </h2>
                    <div className="w-24 h-1 bg-[#f6a302] mx-auto mb-6"></div>
                    <form className="w-full max-w-md">
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="text-white font-bold text-sm mb-1 block">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-white font-bold text-sm mb-1 block">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-bold text-sm mb-1 block">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-bold text-sm mb-1 block">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-bold text-sm mb-1 block">Date of Birth</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="Day"
                                    min="1"
                                    max="31"
                                    className="w-1/3 px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Month"
                                    min="1"
                                    max="12"
                                    className="w-1/3 px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Year"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className="w-1/3 px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-bold text-sm mb-1 block">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white font-bold text-sm mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-3 py-2 bg-transparent border-b-2 border-[#f6a302] text-white text-sm outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-center mb-4">
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
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#f6a302] text-[#1c1c1c] rounded-full font-bold text-lg transition-colors duration-300 hover:bg-[#e08c00]"
                        >
                            CREATE ACCOUNT
                        </button>
                        <p className="mt-4 text-white text-center text-sm">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-[#f6a302] font-bold underline"
                            >
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
