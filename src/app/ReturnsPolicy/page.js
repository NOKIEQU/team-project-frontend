"use client";
import Navbar from "../components/navbar";

function ReturnsPolicy() {
    return (
        <div className="min-h-screen bg-[#1a1a22] text-white">
            <div className="w-full bg-gradient-to-r from-[#252530] to-[#1a1a22] py-16">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">Returns Policy</h1>
                    <div className="w-24 h-1 bg-[#f6a302] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-300 text-center mt-6 max-w-2xl mx-auto">
                        Our straightforward approach to digital game returns and refunds
                    </p>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">Return Period</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We get it—sometimes a game just isn't your vibe. For digital purchases, you have 14 days from the date of purchase to request a refund, but only if the game key hasn't been activated. Once a key is redeemed on any platform, we can't accept returns.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">Return Conditions</h2>
                            <p className="text-gray-300 mb-4">Before requesting a refund, please ensure:</p>
                            <ul className="text-gray-300 space-y-3 pl-5 list-disc">
                                <li>The game key has not been revealed or activated</li>
                                <li>The purchase was made within the last 14 days</li>
                                <li>You've included your order number when contacting us</li>
                            </ul>
                            <p className="text-gray-300 mt-4">
                                Once a digital key has been revealed or redeemed, it cannot be returned due to the nature of digital products.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
                            <p className="text-gray-300 mb-4">Once we receive your refund request:</p>
                            <ul className="text-gray-300 space-y-3 pl-5 list-disc">
                                <li><span className="font-medium text-white">Approved</span>: Your refund will be processed in 3-5 business days back to your original payment method</li>
                                <li><span className="font-medium text-white">Rejected</span>: We'll explain why your request couldn't be fulfilled</li>
                            </ul>
                            <p className="text-gray-300 mt-4">
                                No hidden fees or complications—just a straightforward digital refund process.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
                            <p className="text-gray-300 mb-4">Easy as a button mash!</p>
                            <ol className="text-gray-300 space-y-3 pl-5 list-decimal">
                                <li>Contact our support team at <span className="text-[#f6a302]">support@gamevault.com</span></li>
                                <li>Provide your order number & reason for refund</li>
                                <li>Our team will verify your request and process it accordingly</li>
                            </ol>
                            <p className="text-gray-300 mt-4">
                                We'll handle your request as quickly as possible. Game over? Nah. Just a reset.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-2xl mx-auto mt-16 bg-[#1d1d25] p-6 rounded-lg border border-[#3A3A4A]">
                    <h2 className="text-xl font-semibold mb-3">Important Note</h2>
                    <p className="text-gray-300">
                        GameVault reserves the right to refuse returns if we detect abuse of our return policy. 
                        For any special circumstances or questions about our policy, please don't hesitate to 
                        contact our customer support team.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReturnsPolicy;