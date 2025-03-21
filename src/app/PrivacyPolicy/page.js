"use client";

import Navbar from "../components/navbar";

function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#1a1a22] text-white">
            <div className="w-full bg-gradient-to-r from-[#252530] to-[#1a1a22] py-16">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">Privacy Policy</h1>
                    <div className="w-24 h-1 bg-[#f6a302] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-300 text-center mt-6 max-w-2xl mx-auto">
                        How we collect, use, and protect your personal information
                    </p>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto bg-[#252530] rounded-xl overflow-hidden shadow-lg">
                    <div className="h-2 bg-[#f6a302]"></div>
                    <div className="p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Welcome to Game Vault! Your privacy is important to us, and we're committed to protecting it. 
                                This Privacy Policy explains what information we collect, how we use it, and your rights 
                                regarding your data.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">2. What Information We Collect</h2>
                            <p className="text-gray-300 mb-3">We may collect the following types of information:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li><span className="text-white font-medium">Personal Information:</span> Name, email, billing address, and payment details.</li>
                                <li><span className="text-white font-medium">Account Information:</span> Username, password, and preferences.</li>
                                <li><span className="text-white font-medium">Usage Data:</span> IP address, browser type, pages visited, and interactions with our website.</li>
                                <li><span className="text-white font-medium">Purchase History:</span> Games bought, refunds requested, and transaction details.</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-300 mb-3">We use your information to:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>Process orders and payments for digital games.</li>
                                <li>Provide customer support and resolve issues.</li>
                                <li>Improve our website and personalize your experience.</li>
                                <li>Prevent fraud and ensure security.</li>
                                <li>Send promotional emails about new game releases and offers (you can opt-out anytime).</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">4. Do We Share Your Information?</h2>
                            <p className="text-gray-300 mb-3">We DO NOT sell your data. However, we may share it with:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li><span className="text-white font-medium">Payment Processors</span> (for secure transactions).</li>
                                <li><span className="text-white font-medium">Game Publishers</span> (for key activation and verification).</li>
                                <li><span className="text-white font-medium">Legal Authorities</span> (if required by law or to prevent fraud).</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">5. Cookies & Tracking</h2>
                            <p className="text-gray-300 mb-3">We use cookies to:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>Remember your preferences and login status.</li>
                                <li>Improve website performance and speed.</li>
                                <li>Show relevant game recommendations based on your interests.</li>
                            </ul>
                            <p className="text-gray-300 mt-3">
                                You can disable cookies in your browser settings, but some features may not work properly.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We take security seriously and use encryption and other protective measures to safeguard your 
                                information. However, no system is 100% secure, so please use strong passwords and keep your 
                                account information private.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
                            <p className="text-gray-300 mb-3">You have the right to:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>Access and download your personal data.</li>
                                <li>Request corrections to inaccurate information.</li>
                                <li>Delete your account and associated data.</li>
                                <li>Opt-out of marketing emails and communications.</li>
                            </ul>
                            <p className="text-gray-300 mt-3">
                                To exercise any of these rights, please contact our support team.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update this policy from time to time to reflect changes in our practices or for legal 
                                reasons. If we make significant changes, we'll notify you by email or through a notice on our 
                                website. Regularly checking this page is recommended to stay informed of any updates.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have questions or concerns about our Privacy Policy or your personal data, please contact us at <span className="text-[#f6a302]">privacy@gamevault.com</span>.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-4xl mx-auto mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Last Updated: March 2025
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;