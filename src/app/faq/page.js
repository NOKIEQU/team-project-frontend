"use client";
import Navbar from "../components/navbar";

function faq() {
    return (
        <div className="min-h-screen bg-[#1a1a22] text-white">
            <div className="w-full bg-gradient-to-r from-[#252530] to-[#1a1a22] py-16">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">FAQ</h1>
                    <div className="w-24 h-1 bg-[#f6a302] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-300 text-center mt-6 max-w-2xl mx-auto">
                        Our Frequently Asked Questions
                    </p>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">What is Game Vault?</h2>
                            <p className="text-gray-300 leading-relaxed">
                            Game Vault is your ultimate destination for buying, selling, and discovering video games. Whether you're looking for the latest releases or nostalgic classics, we’ve got you covered.                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">How do I create an account?</h2>
                            <p className="text-gray-300 mb-4">Simply:</p>
                            <ul className="text-gray-300 space-y-3 pl-5 list-disc">
                             click the Sign Up button, enter your email, create a password, and you’re good to go! We’re not saying you need to keep it in a display case… but that would help.

                            </ul>
                            
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">What payment methods do you accept?</h2>
                            <p className="text-gray-300 mb-4">We accept:</p>
                            <ul className="text-gray-300 space-y-3 pl-5 list-disc">
                            <li>✔️ Credit & Debit Cards (Visa, MasterCard, Amex)</li>
                        <li>✔️  PayPal</li>
                        <li>✔️  MasterCard</li>
                        <li>✔️  PayPal</li>
                            </ul>
                            
                        </div>
                    </div>
                    
                    <div className="bg-[#252530] rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                        <div className="h-2 bg-[#f6a302]"></div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">How do I track my order?</h2>
                            <br></br>
                            <ol className="text-gray-300 space-y-3 pl-5 list-decimal">
                                Once your order ships, you’ll receive an email with a tracking number. You can also check your order status in the My Orders section of your account
                            </ol>
                            
                            
                            
                        </div>
                    </div>
                    
                </div>
                
                <div className="max-w-2xl mx-auto mt-16 bg-[#1d1d25] p-6 rounded-lg border border-[#3A3A4A]">
                    <h2 className="text-xl font-semibold mb-3">Other Questions?</h2>
                    <p className="text-gray-300">
                        Sends your questions to GameVault@gmail.com and we'll get back to you as soon as we can put our controllers down
                    </p>
                </div>
            </div>
        </div>
    );
}

export default faq;
