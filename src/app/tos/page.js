"use client";

import Navbar from "../components/navbar";

function TandC() {
    return (
        <div className="min-h-screen bg-[#1a1a22] text-white">
            <div className="w-full bg-gradient-to-r from-[#252530] to-[#1a1a22] py-16">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">Terms and Conditions</h1>
                    <div className="w-24 h-1 bg-[#f6a302] mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-300 text-center mt-6 max-w-2xl mx-auto">
                        The Important Stuff
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto bg-[#252530] rounded-xl overflow-hidden shadow-lg">
                    <div className="h-2 bg-[#f6a302]"></div>
                    <div className="p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">1. Welcome to Game Vault!</h2>
                            <p className="text-gray-300 leading-relaxed">
                                By accessing or using Game Vault , you agree to these Terms & Conditions. If you don't agree, well... you can always rage quit, but we'd rather you stay!.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">2. Who Can Use Game Vault?</h2>

                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>You must be at least 13 years old (or have permission from a responsible adult).</li>
                                <li>  You agree to use Game Vault only for legal and non-shady activities.</li>
                                <li>  If we suspect any rule-breaking, we reserve the right to banhammer your account.</li>

                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">3. Your Account</h2>

                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li> Keep your login credentials safe—don't share them, unless you enjoy unexpected inventory losses..</li>
                                <li>We're not responsible for any unauthorized access to your account. Use strong passwords!</li>
                                <li>  If you suspect suspicious activity, contact support ASAP..</li>

                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">4. Buying & Selling Games</h2>

                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>All prices are in GDP (unless stated otherwise) and may change faster than a speedrunner completing a level.</li>
                                <li>  Digital game codes are non-refundable once redeemed.</li>
                                <li> Physical games can be returned if they meet our Return Policy.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">5. User Conduct</h2>
                            <p className="text-gray-300 mb-3"> You MUST NOT:</p>
                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                <li>Engage in harassment, hate speech, or general toxic behavior..</li>
                                <li>Try to break our website (seriously, our developers are already stressed enough).</li>
                                <li>Violate any applicable laws or regulations.</li>
                            </ul>

                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">6. Content Ownership</h2>
                            <p className="text-gray-300 leading-relaxed">
                                All content on Game Vault (logos, text, images, game descriptions) belongs to us or our partners. Don't steal, copy, or use our content without permission, or we'll have to level up our legal team.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>

                            <ul className="text-gray-300 space-y-2 pl-5 list-disc">
                                We try our best to keep everything running smoothly, but we can't guarantee 100% uptime (even the best servers need a break).

                                We are not responsible for any in-game losses, corrupted saves, or unfortunate encounters with game-breaking bugs.
                            </ul>

                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you break these rules, we may suspend or terminate your account without warning.

                                If you think we made a mistake, you can appeal by contacting our support team.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">9. Changes to These Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update these Terms from time to time. If we make big changes, we'll let you know (but checking this page regularly is a good habit!).
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                            Questions? Issues? Found a typo? Reach out at 📧 support@gamevault.com.
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


export default TandC;
