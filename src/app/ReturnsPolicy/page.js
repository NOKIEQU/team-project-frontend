"use client";

import Navbar from "../components/navbar";

function ReturnsPolicy() {


    return (

        <div className="flex flex-col   justify-center items-center min-h-screen bg-[#1a1a22] p-6">
            <h1 className="text-4xl text-white font-bold  mb-6">Returns Policy</h1>
            <div className="w-full max-w-2xl  space-y-10">
                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg  hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">Return Period</h2>
                    <p className="text-">We get it—sometimes a game just isn't your vibe. No worries! You’ve got 30 days from the date of purchase to return it. That’s plenty of time to realize if your new game is a masterpiece or just meh..</p>
                </div>

                <div className="bg-white  h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">Return Conditions</h2>
                    <p className="text-black">Before you send it back to the vault, make sure:
                        <p className="text-black">✅ It’s in mint condition (no scratches, coffee spills, or rage-induced controller marks).,</p>
                        <p className="text-black">✅ It’s in the original packaging—if it came in a box, it goes back in a box!,</p>
                        <p className="text-black">✅ It hasn’t been activated or used (for digital games, once redeemed, it's locked in).</p>

                        We’re not saying you need to keep it in a display case… but that would help..</p>
                </div>

                <div className="bg-white h-56 p-6 rounded-2xl shadow-lg hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">Refund Process</h2>
                    <p className="text-black">Once we get your return, our Vault Keepers will inspect it faster than you can say "respawn."
                        <p className="text-black">✔️ Approved? Your refund will be processed in 5-7 business days—faster than grinding XP!</p>
                        <p className="text-black">❌ Rejected? We’ll let you know why and send it back to you.</p>
                        No loot boxes, no tricks—just a fair return process..</p>
                </div>

                <div className="bg-white   h-56 p-6 rounded-2xl shadow-lg hover:scale-105 ">
                    <h2 className="text-2xl font-semibold mb-2">How to Initiate a Return</h2>
                    <p className="text-black">Easy as a button mash! </p>
                    <p className="text-black">1️⃣ Contact our support team at 📧 support@gamevault.com ,</p>
                    <p className="text-black">2️⃣ Give us your order number & the reason for your return,</p>
                    <p className="text-black">3️⃣ We’ll send you a return label & instructions—just follow the questline! </p>

                    <p className="text-black"> Once it’s back in our vault, we’ll handle the rest. Game over? Nah. Just a reset. 🎮.</p>
                </div>
            </div>
        </div>

    );
}

export default ReturnsPolicy;